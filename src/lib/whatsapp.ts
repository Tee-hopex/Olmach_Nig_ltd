import type { CartItem } from '../types';
import { formatPrice } from './utils';

export function buildCartWhatsAppUrl(
  items: CartItem[],
  total: number,
  waNumber: string
): string {
  const lines = items.map(
    (item, i) =>
      `${i + 1}. ${item.product.name} × ${item.quantity} — ${formatPrice(
        (item.product.salePrice ?? item.product.price) * item.quantity
      )}`
  );
  const msg =
    `Hi Olmach! I'd like to enquire about the following item(s):\n\n` +
    lines.join('\n') +
    `\n\nEstimated Total: ${formatPrice(total)}\n\nPlease confirm availability and delivery. Thank you!`;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
}

export function buildOrderWhatsAppUrl(
  orderNumber: string,
  items: { name: string; quantity: number; price: number }[],
  total: number,
  waNumber: string
): string {
  const lines = items.map(
    (item, i) =>
      `${i + 1}. ${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`
  );
  const msg =
    `Hi Olmach! I just placed Order #${orderNumber}:\n\n` +
    lines.join('\n') +
    `\n\nTotal: ${formatPrice(total)}\n\nPlease confirm and advise on next steps. Thank you!`;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
}
