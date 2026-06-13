import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const categorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional().nullable(),
});

export async function getCategories(_req: Request, res: Response): Promise<void> {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { products: true } } },
  });
  res.json(categories);
}

export async function createCategory(req: Request, res: Response): Promise<void> {
  const result = categorySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }
  const data = result.data;
  const slug = slugify(data.name);
  const category = await prisma.category.create({ data: { ...data, slug } });
  res.status(201).json(category);
}

export async function updateCategory(req: Request, res: Response): Promise<void> {
  const existing = await prisma.category.findUnique({ where: { id: req.params.id } });
  if (!existing) { res.status(404).json({ error: 'Category not found' }); return; }

  const result = categorySchema.partial().safeParse(req.body);
  if (!result.success) { res.status(400).json({ error: result.error.flatten() }); return; }

  const data = result.data;
  const slug = data.name ? slugify(data.name) : existing.slug;
  const category = await prisma.category.update({ where: { id: req.params.id }, data: { ...data, slug } });
  res.json(category);
}

export async function deleteCategory(req: Request, res: Response): Promise<void> {
  const existing = await prisma.category.findUnique({ where: { id: req.params.id } });
  if (!existing) { res.status(404).json({ error: 'Category not found' }); return; }
  await prisma.category.delete({ where: { id: req.params.id } });
  res.json({ message: 'Category deleted' });
}
