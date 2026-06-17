import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { formatPrice, formatDiscount } from '../../lib/utils';
import StarRating from './StarRating';
import Badge from './Badge';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem: addToCart, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wished = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock || product.stockCount === 0) {
      toast.error('This item is out of stock');
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`, { duration: 2000 });
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
    toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist!', {
      duration: 1500,
    });
  };

  const displayPrice = product.salePrice ?? product.price;
  const hasDiscount = Boolean(product.salePrice);

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-card card-hover flex flex-col border border-gray-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-cream-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge
              label={product.badge}
              variant={
                product.badge === 'Sale'
                  ? 'red'
                  : product.badge === 'New'
                  ? 'green'
                  : 'gold'
              }
            />
          </div>
        )}

        {/* Discount % */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{formatDiscount(product.price, product.salePrice!)}%
          </div>
        )}

        {/* Out of stock overlay */}
        {(!product.inStock || product.stockCount === 0) && (
          <div className="absolute inset-0 bg-navy-900/60 flex items-center justify-center">
            <span className="bg-white text-navy-900 font-bold text-xs px-3 py-1.5 rounded-full tracking-wide uppercase">Out of Stock</span>
          </div>
        )}

        {/* Hover actions */}
        {product.inStock && product.stockCount > 0 && (
          <div className="absolute inset-0 bg-navy-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={handleWishlist}
              className={`p-2.5 rounded-full transition-colors ${
                wished
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-navy-900 hover:bg-gold-500'
              }`}
              title="Add to wishlist"
            >
              <Heart className={`w-4 h-4 ${wished ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2.5 bg-gold-500 text-navy-900 rounded-full hover:bg-gold-600 transition-colors"
              title="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
            <span className="p-2.5 bg-white text-navy-900 rounded-full hover:bg-cream-100 transition-colors cursor-pointer">
              <Eye className="w-4 h-4" />
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gold-600 font-medium uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-navy-900 line-clamp-2 mb-2 leading-snug">
          {product.name}
        </h3>

        <div className="mt-auto">
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
            size="sm"
          />

          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-base font-bold text-navy-900">
                {formatPrice(displayPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through ml-2">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {product.inStock && product.stockCount > 0 ? (
              <button
                type="button"
                onClick={handleAddToCart}
                className="text-xs bg-navy-900 hover:bg-gold-500 hover:text-navy-900 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors duration-200"
              >
                Add to Cart
              </button>
            ) : (
              <span className="text-xs bg-gray-200 text-gray-400 font-semibold px-3 py-1.5 rounded-lg cursor-not-allowed">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
