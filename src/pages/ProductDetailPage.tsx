import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ShoppingCart, Heart, ShieldCheck, Truck, MessageCircle,
  ChevronRight, Plus, Minus, Check,
} from 'lucide-react';
import { useProductBySlug, useFeaturedProducts, useSiteSettings } from '../hooks/usePublicData';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { formatPrice, formatDiscount } from '../lib/utils';
import StarRating from '../components/ui/StarRating';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/ui/ProductCard';
import toast from 'react-hot-toast';

function Skeleton() {
  return (
    <div className="bg-cream-50 min-h-screen animate-pulse">
      <div className="bg-white border-b border-gray-100 h-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="aspect-square bg-gray-100 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-100 rounded w-1/4" />
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-10 bg-gray-100 rounded w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError } = useProductBySlug(slug ?? '');
  const { data: related = [] } = useFeaturedProducts();
  const { data: settings } = useSiteSettings();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews' | 'faq'>('description');

  const { addItem: addToCart, openCart, items: cartItems } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (isLoading) return <Skeleton />;

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Product not found.</p>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const wished = isInWishlist(product.id);
  const displayPrice = product.salePrice ?? product.price;
  const hasDiscount = Boolean(product.salePrice);
  const waNumber = settings?.whatsappNumber ?? '2348012345678';
  const waMsg = encodeURIComponent(`Hi! I'm interested in the ${product.name}. Can you share more details?`);

  const cartQty = cartItems.find(i => i.product.id === product.id)?.quantity ?? 0;
  const maxQty = Math.max(0, product.stockCount - cartQty);

  const handleAddToCart = () => {
    if (!product.inStock || maxQty === 0) {
      toast.error(cartQty > 0 ? 'You already have the maximum available in your cart' : 'Sorry, this item is out of stock');
      return;
    }
    const addQty = Math.min(qty, maxQty);
    addToCart(product, addQty);
    toast.success(`${product.name} added to cart!`);
    openCart();
  };

  const handleWishlist = () => {
    toggleItem(product);
    toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const relatedFiltered = related.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-gold-600 transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-card">
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge label={product.badge} variant={product.badge === 'Sale' ? 'red' : product.badge === 'New' ? 'green' : 'gold'} size="md" />
                </div>
              )}
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                  -{formatDiscount(product.price, product.salePrice!)}%
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} type="button" aria-label={`View image ${i + 1}`} onClick={() => setActiveImage(i)}
                    className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-colors ${activeImage === i ? 'border-gold-500' : 'border-transparent'}`}>
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-sm text-gold-600 font-semibold uppercase tracking-wide mb-2">{product.brand}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3 leading-snug">{product.name}</h1>

            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
              {product.inStock
                ? <span className="flex items-center gap-1 text-green-600 text-sm font-medium"><Check className="w-4 h-4" /> In Stock</span>
                : <span className="text-red-500 text-sm font-medium">Out of Stock</span>}
            </div>

            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl font-bold text-navy-900">{formatPrice(displayPrice)}</span>
              {hasDiscount && <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.shortDescription}</p>

            {product.features.length > 0 && (
              <ul className="space-y-2 mb-6">
                {product.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3 text-navy-900 hover:bg-cream-100 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 font-semibold text-navy-900 min-w-[3rem] text-center">{qty}</span>
                  <button type="button" aria-label="Increase quantity"
                    onClick={() => setQty(Math.min(maxQty, qty + 1))}
                    disabled={qty >= maxQty}
                    className="px-3 py-3 text-navy-900 hover:bg-cream-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {product.inStock && product.stockCount > 0 ? (
                  <span className={`text-sm ${product.stockCount <= 3 ? 'text-orange-500 font-medium' : 'text-gray-400'}`}>
                    {product.stockCount <= 3 ? `Only ${product.stockCount} left!` : `${product.stockCount} available`}
                    {cartQty > 0 && ` (${cartQty} in cart)`}
                  </span>
                ) : (
                  <span className="text-sm text-red-500 font-medium">Out of stock</span>
                )}
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={handleAddToCart} disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center gap-2 btn-secondary py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed">
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <Link to="/checkout" onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 btn-primary py-3.5 rounded-xl text-center">
                  Buy Now
                </Link>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={handleWishlist}
                  className={`flex items-center gap-2 flex-1 justify-center border-2 py-3 rounded-xl text-sm font-semibold transition-colors ${wished ? 'border-red-300 text-red-500 bg-red-50' : 'border-gray-200 text-gray-600 hover:border-gold-400 hover:text-gold-600'}`}>
                  <Heart className={`w-4 h-4 ${wished ? 'fill-red-500' : ''}`} />
                  {wished ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
                <a href={`https://wa.me/${waNumber}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 flex-1 justify-center border-2 border-green-300 text-green-600 hover:bg-green-50 py-3 rounded-xl text-sm font-semibold transition-colors">
                  <MessageCircle className="w-4 h-4" /> Enquire on WhatsApp
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-cream-50 rounded-2xl p-4 border border-gray-100">
              {[
                { icon: ShieldCheck, text: product.warranty ? `Warranty: ${product.warranty}` : 'Warranty included', color: 'text-green-500' },
                { icon: Truck, text: 'Nationwide Delivery', color: 'text-blue-500' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className={`w-4 h-4 ${item.color} flex-shrink-0`} />
                  <span className="text-xs text-gray-600">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden mb-12">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {(['description', 'specs', 'reviews', 'faq'] as const).map(tab => (
              <button key={tab} type="button" onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab ? 'border-b-2 border-gold-500 text-gold-600' : 'text-gray-500 hover:text-navy-900'}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                {product.features.length > 0 && (
                  <>
                    <h4 className="font-semibold text-navy-900 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />{f}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {activeTab === 'specs' && (
              Object.keys(product.specifications).length > 0 ? (
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specifications as Record<string, string>).map(([key, value]) => (
                      <tr key={key} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 pr-8 font-medium text-navy-900 w-1/3">{key}</td>
                        <td className="py-3 text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : <p className="text-gray-500 text-sm">No specifications available.</p>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-navy-900">{product.rating.toFixed(1)}</p>
                    <StarRating rating={product.rating} showCount={false} size="md" />
                    <p className="text-xs text-gray-400 mt-1">{product.reviewCount} reviews</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  Reviews are being loaded. Check back soon or{' '}
                  <a href={`https://wa.me/${waNumber}`} className="text-gold-600 underline" target="_blank" rel="noopener noreferrer">ask us directly</a>.
                </p>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4">
                {[
                  { q: 'Does this machine come with a warranty?', a: `Yes — ${product.warranty ?? '1 Year Manufacturer Warranty'}. We handle all warranty claims on your behalf.` },
                  { q: 'How long does delivery take?', a: 'Lagos orders arrive within 24 hours. Other states within 2–5 business days.' },
                  { q: 'Can I get installation support?', a: 'Yes! Our team provides free setup guidance via WhatsApp and phone call.' },
                  { q: 'Do you accept returns?', a: 'Yes — if the machine is faulty on arrival, we replace it within 7 days.' },
                ].map((item, i) => (
                  <div key={i} className="bg-cream-50 rounded-xl p-4 border border-gray-100">
                    <p className="font-medium text-navy-900 mb-2">{item.q}</p>
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {relatedFiltered.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedFiltered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky cart */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 lg:hidden z-20">
        <button type="button" onClick={handleAddToCart} disabled={!product.inStock}
          className="w-full flex items-center justify-center gap-2 btn-primary py-4 rounded-xl text-base disabled:opacity-50">
          <ShoppingCart className="w-5 h-5" />
          Add to Cart · {formatPrice(displayPrice * qty)}
        </button>
      </div>
    </div>
  );
}
