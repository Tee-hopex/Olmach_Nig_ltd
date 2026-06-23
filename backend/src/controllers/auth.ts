import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function login(req: Request, res: Response): Promise<void> {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Invalid credentials' });
    return;
  }

  const { username, password } = result.data;
  const admin = await prisma.adminUser.findUnique({ where: { username } });
  if (!admin) {
    res.status(401).json({ error: 'Invalid username or password' });
    return;
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    res.status(401).json({ error: 'Invalid username or password' });
    return;
  }

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  res.json({ token, admin: { id: admin.id, username: admin.username } });
}

export async function getMe(req: AuthRequest, res: Response): Promise<void> {
  res.json({ admin: req.admin });
}

export async function changePassword(req: AuthRequest, res: Response): Promise<void> {
  const schema = z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }

  const admin = await prisma.adminUser.findUnique({ where: { id: req.admin!.id } });
  if (!admin) { res.status(404).json({ error: 'Admin not found' }); return; }

  const valid = await bcrypt.compare(result.data.currentPassword, admin.password);
  if (!valid) { res.status(401).json({ error: 'Current password is incorrect' }); return; }

  const hash = await bcrypt.hash(result.data.newPassword, 12);
  await prisma.adminUser.update({ where: { id: admin.id }, data: { password: hash } });
  res.json({ message: 'Password updated successfully' });
}

export async function changeCredentials(req: AuthRequest, res: Response): Promise<void> {
  const schema = z.object({
    currentPassword: z.string().min(1),
    newUsername: z.string().min(3).optional(),
    newPassword: z.string().min(8).optional(),
  }).refine(d => d.newUsername || d.newPassword, {
    message: 'Provide at least a new username or new password',
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }

  const admin = await prisma.adminUser.findUnique({ where: { id: req.admin!.id } });
  if (!admin) { res.status(404).json({ error: 'Admin not found' }); return; }

  const valid = await bcrypt.compare(result.data.currentPassword, admin.password);
  if (!valid) { res.status(401).json({ error: 'Current password is incorrect' }); return; }

  if (result.data.newUsername) {
    const taken = await prisma.adminUser.findFirst({
      where: { username: result.data.newUsername, NOT: { id: admin.id } },
    });
    if (taken) { res.status(409).json({ error: 'Username already taken' }); return; }
  }

  const updateData: { username?: string; password?: string } = {};
  if (result.data.newUsername) updateData.username = result.data.newUsername;
  if (result.data.newPassword) updateData.password = await bcrypt.hash(result.data.newPassword, 12);

  const updated = await prisma.adminUser.update({ where: { id: admin.id }, data: updateData });
  res.json({ message: 'Credentials updated successfully', username: updated.username });
}
