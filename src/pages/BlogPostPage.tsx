import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowLeft, Tag, MessageCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useBlogPost, useBlogPosts, useSiteSettings } from '../hooks/usePublicData';

function Skeleton() {
  return (
    <div className="bg-cream-50 min-h-screen animate-pulse">
      <div className="bg-navy-900 h-56" />
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
        <div className="bg-white rounded-2xl p-8 space-y-3">
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-5/6" />
          <div className="h-3 bg-gray-100 rounded w-4/6" />
        </div>
      </div>
    </div>
  );
}

const mdComponents = {
  h2: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-bold text-navy-900 mt-10 mb-4 pb-2 border-b border-gray-100">
      {children}
    </h2>
  ),
  h3: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-base font-bold text-navy-900 mt-7 mb-2.5">{children}</h3>
  ),
  p: ({ children }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">{children}</p>
  ),
  strong: ({ children }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-navy-900">{children}</strong>
  ),
  ul: ({ children }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-2.5 mb-5">{children}</ul>
  ),
  ol: ({ children }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="space-y-2.5 mb-5 counter-reset-list">{children}</ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement> & { ordered?: boolean; index?: number }) => {
    const isOrdered = (props as { ordered?: boolean }).ordered;
    return isOrdered ? (
      <li className="flex items-start gap-2.5 text-gray-600 text-[15px] leading-relaxed list-none">
        <span className="mt-0.5 min-w-[1.5rem] h-6 flex items-center justify-center rounded-full bg-navy-900 text-white text-xs font-bold flex-shrink-0">
          {(props as { index?: number }).index !== undefined ? (props as { index?: number }).index! + 1 : ''}
        </span>
        <span className="pt-0.5">{children}</span>
      </li>
    ) : (
      <li className="flex items-start gap-2.5 text-gray-600 text-[15px] leading-relaxed list-none">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
        <span>{children}</span>
      </li>
    );
  },
  table: ({ children }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left">{children}</table>
    </div>
  ),
  thead: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-navy-900 text-white">{children}</thead>
  ),
  tbody: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-gray-100">{children}</tbody>
  ),
  tr: ({ children }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="even:bg-gray-50/60 hover:bg-gold-50/40 transition-colors">{children}</tr>
  ),
  th: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">{children}</th>
  ),
  td: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-gray-600 align-top">{children}</td>
  ),
  blockquote: ({ children }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gold-400 bg-gold-50 pl-4 pr-3 py-3 rounded-r-xl mb-5 text-gray-700 italic">
      {children}
    </blockquote>
  ),
  code: ({ children }: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-gray-100 text-red-600 text-xs px-1.5 py-0.5 rounded font-mono">{children}</code>
  ),
  hr: () => <hr className="my-8 border-gray-100" />,
  a: ({ href, children }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} className="text-red-600 hover:text-red-700 underline underline-offset-2">{children}</a>
  ),
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useBlogPost(slug ?? '');
  const { data: allPosts } = useBlogPosts({ limit: 10 });
  const { data: settings } = useSiteSettings();
  const waNumber = settings?.whatsappNumber && settings.whatsappNumber !== '2349021627280' ? settings.whatsappNumber : '2349021627280';

  if (isLoading) return <Skeleton />;

  if (isError || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Article not found.</p>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  const related = (allPosts?.posts ?? []).filter(p => p.id !== post.id).slice(0, 3);
  const content = post.content ?? post.excerpt;

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero */}
      <div className="relative bg-navy-900 text-white py-14">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-navy-900/80" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="inline-flex items-center gap-1.5 bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
            {post.category}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>{post.author}</span>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime} min read</span>
            </div>
            <span>·</span>
            <span>{new Date(post.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-card mb-6">
          {/* Excerpt callout */}
          {post.excerpt && (
            <p className="text-base text-gray-500 italic border-l-4 border-gold-400 pl-4 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents as never}>
            {content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="bg-navy-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 mb-12">
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold mb-1">Have questions about sewing machines?</p>
            <p className="text-white/60 text-sm">Our experts are ready to help you choose the perfect machine for your needs.</p>
          </div>
          <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors flex-shrink-0">
            <MessageCircle className="w-4 h-4" /> Ask an Expert
          </a>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div>
            <h3 className="font-bold text-navy-900 text-lg mb-5">More Articles</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-card card-hover">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-navy-900 line-clamp-2 group-hover:text-gold-600 transition-colors">{p.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
