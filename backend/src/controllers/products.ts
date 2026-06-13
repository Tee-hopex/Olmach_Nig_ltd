import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const productSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  categoryId: z.string().min(1),
  subcategory: z.string().optional(),
  price: z.number().positive(),
  salePrice: z.number().positive().optional().nullable(),
  images: z.array(z.string()).min(1),
  description: z.string().min(1),
  shortDescription: z.string().min(1),
  features: z.array(z.string()).default([]),
  specifications: z.record(z.string()).default({}),
  inStock: z.boolean().default(true),
  stockCount: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isNew: z.boolean().default(false),
  badge: z.string().optional().nullable(),
  warranty: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
});

export async function getProducts(req: Request, res: Response): Promise<void> {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (req.query.category) where.category = { slug: req.query.category };
  if (req.query.brand) where.brand = req.query.brand;
  if (req.query.featured === 'true') where.isFeatured = true;
  if (req.query.bestseller === 'true') where.isBestSeller = true;
  if (req.query.new === 'true') where.isNew = true;
  if (req.query.instock === 'true') where.inStock = true;
  if (req.query.search) {
    where.OR = [
      { name: { contains: req.query.search as string, mode: 'insensitive' } },
      { brand: { contains: req.query.search as string, mode: 'insensitive' } },
      { tags: { has: req.query.search as string } },
    ];
  }
  if (req.query.minPrice || req.query.maxPrice) {
    where.price = {
      ...(req.query.minPrice ? { gte: parseFloat(req.query.minPrice as string) } : {}),
      ...(req.query.maxPrice ? { lte: parseFloat(req.query.maxPrice as string) } : {}),
    };
  }

  const orderBy: Record<string, string> = {};
  switch (req.query.sort) {
    case 'price-asc': orderBy.price = 'asc'; break;
    case 'price-desc': orderBy.price = 'desc'; break;
    case 'rating': orderBy.rating = 'desc'; break;
    case 'newest': orderBy.createdAt = 'desc'; break;
    default: orderBy.createdAt = 'desc';
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy, skip, take: limit, include: { category: true } }),
    prisma.product.count({ where }),
  ]);

  res.json({ products, total, page, totalPages: Math.ceil(total / limit) });
}

export async function getProductBySlug(req: Request, res: Response): Promise<void> {
  const product = await prisma.product.findUnique({
    where: { slug: req.params.slug },
    include: { category: true },
  });
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json(product);
}

export async function getFeaturedProducts(_req: Request, res: Response): Promise<void> {
  const products = await prisma.product.findMany({
    where: { isFeatured: true, inStock: true },
    take: 8,
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });
  res.json(products);
}

export async function createProduct(req: Request, res: Response): Promise<void> {
  const result = productSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }

  const data = result.data;
  const baseSlug = slugify(data.name);
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const product = await prisma.product.create({
    data: { ...data, slug, specifications: data.specifications as object },
    include: { category: true },
  });
  res.status(201).json(product);
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
  const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  const result = productSchema.partial().safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }

  const data = result.data;

  // stockCount is the authority: 0 always forces out-of-stock, >0 always forces in-stock.
  // This overrides whatever the inStock checkbox sent, so the two fields stay in sync.
  if (data.stockCount !== undefined) {
    data.inStock = data.stockCount > 0;
  }

  let slug = existing.slug;
  if (data.name && data.name !== existing.name) {
    const baseSlug = slugify(data.name);
    slug = baseSlug;
    let counter = 1;
    while (await prisma.product.findFirst({ where: { slug, NOT: { id: existing.id } } })) {
      slug = `${baseSlug}-${counter++}`;
    }
  }

  const product = await prisma.product.update({
    where: { id: req.params.id },
    data: {
      ...data,
      slug,
      specifications: data.specifications ? (data.specifications as object) : undefined,
    },
    include: { category: true },
  });
  res.json(product);
}

export async function getProductById(req: Request, res: Response): Promise<void> {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
    include: { category: true },
  });
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json(product);
}

export async function deleteProduct(req: Request, res: Response): Promise<void> {
  const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ message: 'Product deleted' });
}
