export const formatPrice = (price: number): string =>
  `₦${price.toLocaleString('en-NG')}`;

export const formatDiscount = (original: number, sale: number): number =>
  Math.round(((original - sale) / original) * 100);

export const truncate = (str: string, len: number): string =>
  str.length > len ? str.slice(0, len) + '…' : str;

export const slugify = (str: string): string =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

export const cn = (...classes: (string | undefined | false | null)[]): string =>
  classes.filter(Boolean).join(' ');
