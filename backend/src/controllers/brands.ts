import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const brandSchema = z.object({
  name: z.string().min(1),
  logo: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export async function getBrands(_req: Request, res: Response): Promise<void> {
  const [brands, counts] = await Promise.all([
    prisma.brand.findMany({ orderBy: { name: 'asc' } }),
    prisma.product.groupBy({ by: ['brand'], _count: { brand: true } }),
  ]);
  const countMap: Record<string, number> = {};
  counts.forEach(c => { countMap[c.brand] = c._count.brand; });
  res.json(brands.map(b => ({ ...b, productCount: countMap[b.name] ?? 0 })));
}

export async function createBrand(req: Request, res: Response): Promise<void> {
  const result = brandSchema.safeParse(req.body);
  if (!result.success) { res.status(400).json({ error: result.error.flatten() }); return; }
  const slug = slugify(result.data.name);
  const brand = await prisma.brand.create({ data: { ...result.data, slug } });
  res.status(201).json(brand);
}

export async function updateBrand(req: Request, res: Response): Promise<void> {
  const existing = await prisma.brand.findUnique({ where: { id: req.params.id } });
  if (!existing) { res.status(404).json({ error: 'Brand not found' }); return; }

  const result = brandSchema.partial().safeParse(req.body);
  if (!result.success) { res.status(400).json({ error: result.error.flatten() }); return; }

  const slug = result.data.name ? slugify(result.data.name) : existing.slug;
  const brand = await prisma.brand.update({ where: { id: req.params.id }, data: { ...result.data, slug } });
  res.json(brand);
}

export async function deleteBrand(req: Request, res: Response): Promise<void> {
  const existing = await prisma.brand.findUnique({ where: { id: req.params.id } });
  if (!existing) { res.status(404).json({ error: 'Brand not found' }); return; }
  await prisma.brand.delete({ where: { id: req.params.id } });
  res.json({ message: 'Brand deleted' });
}
