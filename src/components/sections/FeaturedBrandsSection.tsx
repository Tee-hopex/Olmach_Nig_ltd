import { usePublicBrands } from '../../hooks/usePublicData';

export default function FeaturedBrandsSection() {
  const { data: brands = [], isLoading } = usePublicBrands();

  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
            Authorised Dealer for
          </p>
          <h2 className="text-2xl font-bold text-navy-900 mt-1">
            Trusted Sewing Machine Brands
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100">
                  <div className="w-16 h-16 rounded-xl bg-gray-100" />
                  <div className="space-y-1 w-full">
                    <div className="h-3 bg-gray-100 rounded mx-auto w-2/3" />
                    <div className="h-2.5 bg-gray-100 rounded mx-auto w-1/2" />
                  </div>
                </div>
              ))
            : brands.map(brand => (
                <div key={brand.id}
                  className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-gold-200 hover:shadow-card transition-all duration-300 cursor-pointer">
                  <div className="w-16 h-16 rounded-xl bg-cream-100 flex items-center justify-center overflow-hidden">
                    {brand.logo
                      ? <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain p-2" />
                      : <span className="font-bold text-navy-900 text-xl group-hover:text-gold-600 transition-colors">{brand.name.charAt(0)}</span>}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-navy-900">{brand.name}</p>
                    <p className="text-xs text-gray-400">{brand.productCount} products</p>
                  </div>
                </div>
              ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          All products are 100% genuine with official warranties. We are an authorised dealer for all listed brands.
        </p>
      </div>
    </section>
  );
}
