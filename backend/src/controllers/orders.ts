import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

const orderItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  quantity: z.number().int().positive(),
});

const placeOrderSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  items: z.array(orderItemSchema).min(1),
  paymentMethod: z.enum(['bank_transfer', 'card', 'pay_on_delivery']).default('bank_transfer'),
  notes: z.string().optional(),
});

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SH-${ts}-${rand}`;
}

export async function placeOrder(req: Request, res: Response): Promise<void> {
  const result = placeOrderSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }

  const data = result.data;
  const settings = await prisma.siteSettings.findFirst();
  const freeThreshold = settings?.freeDeliveryThreshold ?? 50000;
  const deliveryFeeAmt = settings?.deliveryFee ?? 1500;

  const subtotal = data.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = subtotal >= freeThreshold ? 0 : deliveryFeeAmt;
  const total = subtotal + deliveryFee;

  let orderNumber = generateOrderNumber();
  while (await prisma.order.findUnique({ where: { orderNumber } })) {
    orderNumber = generateOrderNumber();
  }

  try {
    const order = await prisma.$transaction(async (tx) => {
      // Validate stock and decrement for each item
      for (const item of data.items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        if (!product) {
          throw Object.assign(new Error(`Product not found: ${item.name}`), { status: 404 });
        }
        if (!product.inStock || product.stockCount < item.quantity) {
          throw Object.assign(
            new Error(`"${item.name}" only has ${product.stockCount} unit(s) available`),
            { status: 409 }
          );
        }
        const newStock = product.stockCount - item.quantity;
        await tx.product.update({
          where: { id: item.productId },
          data: { stockCount: newStock, inStock: newStock > 0 },
        });
      }

      return tx.order.create({
        data: {
          orderNumber,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          address: data.address,
          city: data.city,
          state: data.state,
          items: data.items as object[],
          subtotal,
          deliveryFee,
          total,
          paymentMethod: data.paymentMethod,
          notes: data.notes,
        },
      });
    });

    res.status(201).json({ order, settings });
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string };
    res.status(e.status ?? 500).json({ error: e.message ?? 'Failed to place order' });
  }
}

export async function trackOrder(req: Request, res: Response): Promise<void> {
  const order = await prisma.order.findUnique({ where: { orderNumber: req.params.orderNumber } });
  if (!order) { res.status(404).json({ error: 'Order not found' }); return; }
  res.json(order);
}

export async function getOrders(req: Request, res: Response): Promise<void> {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;
  const where: Record<string, unknown> = {};
  if (req.query.status) where.status = req.query.status;
  if (req.query.search) {
    where.OR = [
      { orderNumber: { contains: req.query.search as string, mode: 'insensitive' } },
      { customerName: { contains: req.query.search as string, mode: 'insensitive' } },
      { customerEmail: { contains: req.query.search as string, mode: 'insensitive' } },
    ];
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.order.count({ where }),
  ]);
  res.json({ orders, total, page, totalPages: Math.ceil(total / limit) });
}

export async function getOrderById(req: Request, res: Response): Promise<void> {
  const order = await prisma.order.findUnique({ where: { id: req.params.id } });
  if (!order) { res.status(404).json({ error: 'Order not found' }); return; }
  res.json(order);
}

export async function updateOrderStatus(req: Request, res: Response): Promise<void> {
  const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
  const { status } = req.body;
  if (!statuses.includes(status)) {
    res.status(400).json({ error: 'Invalid status' });
    return;
  }
  const order = await prisma.order.update({ where: { id: req.params.id }, data: { status } });
  res.json(order);
}

export async function markOrderPaid(req: Request, res: Response): Promise<void> {
  const { paymentProof } = req.body;
  const order = await prisma.order.update({
    where: { id: req.params.id },
    data: { paymentProof, status: 'confirmed' },
  });
  res.json(order);
}
