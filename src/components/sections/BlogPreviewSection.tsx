import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { useBlogPosts } from '../../hooks/usePublicData';

function Skeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-gray-100" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-2/3" />
      </div>
    </div>
  );
}

export default function BlogPreviewSection() {
  const { data, isLoading } = useBlogPosts({ limit: 4 });
  const posts = data?.posts ?? [];

  return (
    <section className="py-16 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-heading">Sewing Tips & Guides</h2>
            <p className="section-subheading mt-1">
              Expert advice on machines, maintenance and growing your tailoring business
            </p>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors">
            All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)
            : posts.map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-card card-hover">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={post.image} alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute top-3 left-3 bg-gold-500 text-navy-900 text-xs font-bold px-2.5 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-navy-900 line-clamp-2 mb-2 leading-snug group-hover:text-gold-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime} min read</span>
                      <span className="ml-auto">
                        {new Date(post.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
