import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

async function main() {
  const username = process.env.ADMIN_USERNAME ?? 'admin';
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error('❌ Set ADMIN_PASSWORD in your .env file');
    process.exit(1);
  }

  const existing = await prisma.adminUser.findUnique({ where: { username } });
  if (existing) {
    console.log(`ℹ️  Admin "${username}" already exists. Updating password...`);
    const hash = await bcrypt.hash(password, 12);
    await prisma.adminUser.update({ where: { username }, data: { password: hash } });
    console.log('✅ Password updated');
  } else {
    const hash = await bcrypt.hash(password, 12);
    await prisma.adminUser.create({ data: { username, password: hash } });
    console.log(`✅ Admin "${username}" created`);
  }

  // Ensure site settings exist
  const settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    await prisma.siteSettings.create({
      data: {
        bankName: process.env.BANK_NAME ?? 'First Bank Nigeria',
        bankAccountName: process.env.BANK_ACCOUNT_NAME ?? 'Olmach Nig Ltd',
        bankAccountNumber: process.env.BANK_ACCOUNT_NUMBER ?? '0000000000',
        whatsappNumber: process.env.WHATSAPP_NUMBER ?? '2349021627280',
        deliveryFee: parseFloat(process.env.DELIVERY_FEE ?? '1500'),
        freeDeliveryThreshold: parseFloat(process.env.FREE_DELIVERY_THRESHOLD ?? '50000'),
      },
    });
    console.log('✅ Default site settings created');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
