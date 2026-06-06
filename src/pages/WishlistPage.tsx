import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../lib/utils';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart, openCart } = useCartStore();

  const handleAddToCart = (product: (typeof items)[0]) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    openCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center gap-6 px-4">
        <Heart className="w-20 h-20 text-gray-200" />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save products you love to your wishlist.</p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-navy-900 mb-8">
          My Wishlist ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-card flex flex-col"
            >
              <Link to={`/product/${product.slug}`} className="block aspect-[4/3] overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-gold-600 font-medium mb-0.5">{product.brand}</p>
                <Link
                  to={`/product/${product.slug}`}
                  className="text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors line-clamp-2 mb-2"
                >
                  {product.name}
                </Link>
                <p className="text-base font-bold text-navy-900 mt-auto mb-3">
                  {formatPrice(product.salePrice ?? product.price)}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 btn-secondary text-xs py-2.5 rounded-xl"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="p-2.5 border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-gold-600 hover:text-gold-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
