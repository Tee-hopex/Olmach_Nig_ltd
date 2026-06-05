import { Link } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

export default function BlogPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Header */}
      <div className="bg-navy-900 text-white py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Sewing Tips & Guides</h1>
          <p className="text-white/60">
            Expert advice on machines, maintenance and growing your tailoring business in Nigeria
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-card card-hover"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-gold-500 text-navy-900 text-xs font-bold px-2.5 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-base font-semibold text-navy-900 mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime} min read</span>
                  </div>
                  <span>
                    {new Date(post.date).toLocaleDateString('en-NG', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-xs text-gray-500 bg-cream-100 px-2 py-0.5 rounded-full"
                    >
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
