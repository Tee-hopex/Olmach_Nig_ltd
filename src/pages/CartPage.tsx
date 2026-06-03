import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 text-gray-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any machines yet.
          </p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-navy-900 mb-8">
          Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl p-4 shadow-card flex gap-4"
              >
                <Link to={`/product/${item.product.slug}`} className="flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gold-600 font-medium mb-0.5">
                    {item.product.brand}
                  </p>
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors line-clamp-2 leading-snug"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-gray-400 mt-1">{item.product.warranty}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <p className="text-base font-bold text-navy-900">
                    {formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}
                  </p>
                  <div className="flex items-center gap-1 border border-gray-200 rounded-xl">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 text-navy-900 hover:text-gold-600 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 text-navy-900 hover:text-gold-600 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm text-gold-600 hover:text-gold-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-card sticky top-24">
              <h3 className="font-semibold text-navy-900 mb-5 text-lg">Order Summary</h3>

              <div className="space-y-3 text-sm mb-5 border-b border-gray-100 pb-5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-navy-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">
                    {shipping === 0 ? 'Calculated at checkout' : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg text-navy-900 mb-6">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Link
                to="/checkout"
                className="w-full block text-center btn-primary py-4 rounded-xl text-base mb-3"
              >
                Proceed to Checkout <ArrowRight className="inline w-4 h-4 ml-1" />
              </Link>

              <div className="mt-4 space-y-2 text-xs text-gray-400 text-center">
                <p className="flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Secure checkout
                </p>
                <p>Free returns within 7 days for faulty items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
