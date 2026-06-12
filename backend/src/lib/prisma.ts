import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Supabase recommends connection_limit=1 for serverless/edge functions, but this
// is a persistent Express server — bump the pool so parallel queries don't starve.
function buildDatasourceUrl(): string {
  const base = process.env.DATABASE_URL ?? '';
  try {
    const url = new URL(base);
    url.searchParams.set('connection_limit', '5');
    url.searchParams.set('pool_timeout', '30');
    return url.toString();
  } catch {
    return base;
  }
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: buildDatasourceUrl(),
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
