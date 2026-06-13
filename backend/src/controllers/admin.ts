import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function getDashboardStats(_req: Request, res: Response): Promise<void> {
  const now = new Date();
  const startOfToday    = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth    = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth  = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

  // One SQL query replaces 9 separate Prisma count/aggregate calls.
  // PostgreSQL COUNT returns bigint → convert with Number().
  type OrderStats = {
    total: bigint; pending: bigint; confirmed: bigint; processing: bigint;
    shipped: bigint; delivered: bigint; cancelled: bigint;
    today_revenue: string; today_count: bigint;
    month_revenue: string; month_count: bigint;
    last_month_revenue: string; last_month_count: bigint;
  };

  const [orderStats] = await prisma.$queryRaw<OrderStats[]>`
    SELECT
      COUNT(*)                                                                              AS total,
      COUNT(*) FILTER (WHERE status = 'pending')                                           AS pending,
      COUNT(*) FILTER (WHERE status = 'confirmed')                                         AS confirmed,
      COUNT(*) FILTER (WHERE status = 'processing')                                        AS processing,
      COUNT(*) FILTER (WHERE status = 'shipped')                                           AS shipped,
      COUNT(*) FILTER (WHERE status = 'delivered')                                         AS delivered,
      COUNT(*) FILTER (WHERE status = 'cancelled')                                         AS cancelled,
      COALESCE(SUM(total) FILTER (WHERE "createdAt" >= ${startOfToday}),     0)::text      AS today_revenue,
      COUNT(*)            FILTER (WHERE "createdAt" >= ${startOfToday})                    AS today_count,
      COALESCE(SUM(total) FILTER (WHERE "createdAt" >= ${startOfMonth}),     0)::text      AS month_revenue,
      COUNT(*)            FILTER (WHERE "createdAt" >= ${startOfMonth})                    AS month_count,
      COALESCE(SUM(total) FILTER (WHERE "createdAt" >= ${startOfLastMonth}
                                    AND "createdAt" <= ${endOfLastMonth}),   0)::text      AS last_month_revenue,
      COUNT(*)            FILTER (WHERE "createdAt" >= ${startOfLastMonth}
                                    AND "createdAt" <= ${endOfLastMonth})                  AS last_month_count
    FROM "Order"
  `;

  const n = (v: bigint | string | number) => Number(v);

  // Run remaining queries sequentially — safe with connection_limit=1.
  const totalProducts    = await prisma.product.count();
  const totalCategories  = await prisma.category.count();
  const totalBrands      = await prisma.brand.count();
  const recentOrders     = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 10 });
  const lowStockProducts = await prisma.product.findMany({
    where: { stockCount: { lte: 5 }, inStock: true },
    orderBy: { stockCount: 'asc' },
    take: 10,
  });

  const monthRevenue     = n(orderStats.month_revenue);
  const lastMonthRevenue = n(orderStats.last_month_revenue);
  const growth = lastMonthRevenue > 0
    ? ((monthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
    : 0;

  res.json({
    products: { total: totalProducts, lowStock: lowStockProducts.length },
    orders: {
      total:      n(orderStats.total),
      pending:    n(orderStats.pending),
      confirmed:  n(orderStats.confirmed),
      processing: n(orderStats.processing),
      shipped:    n(orderStats.shipped),
      delivered:  n(orderStats.delivered),
      cancelled:  n(orderStats.cancelled),
    },
    revenue: {
      today:       n(orderStats.today_revenue),
      todayOrders: n(orderStats.today_count),
      month:       monthRevenue,
      monthOrders: n(orderStats.month_count),
      lastMonth:   lastMonthRevenue,
      growth:      parseFloat(growth.toFixed(1)),
    },
    categories:        totalCategories,
    brands:            totalBrands,
    recentOrders,
    lowStockProducts,
  });
}

const settingsSchema = z.object({
  bankName: z.string().optional(),
  bankAccountName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  whatsappNumber: z.string().optional(),
  deliveryFee: z.number().optional(),
  freeDeliveryThreshold: z.number().optional(),
});

export async function getSettings(_req: Request, res: Response): Promise<void> {
  let settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        bankName: process.env.BANK_NAME ?? '',
        bankAccountName: process.env.BANK_ACCOUNT_NAME ?? '',
        bankAccountNumber: process.env.BANK_ACCOUNT_NUMBER ?? '',
        whatsappNumber: process.env.WHATSAPP_NUMBER ?? '',
        deliveryFee: parseFloat(process.env.DELIVERY_FEE ?? '1500'),
        freeDeliveryThreshold: parseFloat(process.env.FREE_DELIVERY_THRESHOLD ?? '50000'),
      },
    });
  }
  res.json(settings);
}

export async function updateSettings(req: Request, res: Response): Promise<void> {
  const result = settingsSchema.safeParse(req.body);
  if (!result.success) { res.status(400).json({ error: result.error.flatten() }); return; }

  let settings = await prisma.siteSettings.findFirst();
  if (settings) {
    settings = await prisma.siteSettings.update({ where: { id: settings.id }, data: result.data });
  } else {
    settings = await prisma.siteSettings.create({ data: result.data });
  }
  res.json(settings);
}

export async function getSubscribers(_req: Request, res: Response): Promise<void> {
  const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(subscribers);
}

export async function subscribe(req: Request, res: Response): Promise<void> {
  const { email } = req.body;
  if (!email) { res.status(400).json({ error: 'Email is required' }); return; }
  const existing = await prisma.subscriber.findUnique({ where: { email } });
  if (existing) { res.json({ message: 'Already subscribed' }); return; }
  const sub = await prisma.subscriber.create({ data: { email } });
  res.status(201).json(sub);
}
