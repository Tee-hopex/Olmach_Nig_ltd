import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function withReadTime<T extends { content: string; createdAt: Date }>(post: T) {
  const words = post.content.split(/\s+/).length;
  return { ...post, readTime: Math.max(1, Math.ceil(words / 200)), date: post.createdAt };
}

const blogSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  image: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  author: z.string().min(1),
  published: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export async function getBlogPosts(req: Request, res: Response): Promise<void> {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const isAdmin = !!(req as { admin?: unknown }).admin;
  const where = isAdmin ? {} : { published: true };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.blogPost.count({ where }),
  ]);
  res.json({ posts: posts.map(withReadTime), total, page, totalPages: Math.ceil(total / limit) });
}

export async function getBlogPostBySlug(req: Request, res: Response): Promise<void> {
  const post = await prisma.blogPost.findUnique({ where: { slug: req.params.slug } });
  if (!post || (!post.published && !(req as { admin?: unknown }).admin)) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  res.json(withReadTime(post));
}

export async function createBlogPost(req: Request, res: Response): Promise<void> {
  const result = blogSchema.safeParse(req.body);
  if (!result.success) { res.status(400).json({ error: result.error.flatten() }); return; }

  const data = result.data;
  const baseSlug = slugify(data.title);
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.blogPost.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const post = await prisma.blogPost.create({ data: { ...data, slug } });
  res.status(201).json(post);
}

export async function updateBlogPost(req: Request, res: Response): Promise<void> {
  const existing = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
  if (!existing) { res.status(404).json({ error: 'Post not found' }); return; }

  const result = blogSchema.partial().safeParse(req.body);
  if (!result.success) { res.status(400).json({ error: result.error.flatten() }); return; }

  const data = result.data;
  let slug = existing.slug;
  if (data.title && data.title !== existing.title) {
    const base = slugify(data.title);
    slug = base;
    let counter = 1;
    while (await prisma.blogPost.findFirst({ where: { slug, NOT: { id: existing.id } } })) {
      slug = `${base}-${counter++}`;
    }
  }

  const post = await prisma.blogPost.update({ where: { id: req.params.id }, data: { ...data, slug } });
  res.json(post);
}

export async function deleteBlogPost(req: Request, res: Response): Promise<void> {
  const existing = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
  if (!existing) { res.status(404).json({ error: 'Post not found' }); return; }
  await prisma.blogPost.delete({ where: { id: req.params.id } });
  res.json({ message: 'Post deleted' });
}
