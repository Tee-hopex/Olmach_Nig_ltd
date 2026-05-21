export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  salePrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  stockCount: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  badge?: 'New' | 'Best Seller' | 'Sale' | 'Popular';
  warranty: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  product?: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  paymentMethod: 'bank_transfer' | 'card' | 'pay_on_delivery';
  notes?: string;
}

export interface MachineFinderAnswers {
  useCase: string;
  experience: string;
  budget: string;
  features: string[];
}
