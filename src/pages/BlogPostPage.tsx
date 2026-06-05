import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowLeft, Tag, MessageCircle } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const WHATSAPP_NUMBER = '2348012345678';

const FULL_CONTENT: Record<string, string> = {
  'choose-right-sewing-machine-business': `
Starting a tailoring business is an exciting journey, and choosing the right sewing machine is one of the most important decisions you'll make. The wrong machine can slow your production and cost you repairs; the right one will serve you for decades.

**Consider Your Fabric Types**
The fabrics you work with determine how powerful your machine needs to be. Light fabrics like chiffon and silk work fine on basic home machines. But if you'll be sewing denim, leather or multiple layers of fabric, you need a heavy-duty machine like the Singer 4452 or an industrial machine like the Juki DDL-8700.

**Production Volume Matters**
For home sewing and small orders, a good computerized home machine is perfect. For garment production or running a busy tailoring shop, you need an industrial machine rated for 8+ hours of daily use.

**Budget Wisely**
A quality machine is an investment. Budget ₦150,000–₦250,000 for a good home/semi-professional machine. For industrial, budget ₦400,000 and above. Remember: a cheap machine that breaks down costs more in repairs than buying quality once.

**Always Test Before You Buy**
Whenever possible, test the machine with your actual fabrics. At StitchPro, our experts are available via WhatsApp to guide your choice based on your exact needs.
  `,
  'sewing-machine-maintenance-tips': `
A well-maintained sewing machine lasts 20+ years. Neglect it and you'll face costly repairs within months. Here are the 10 most important maintenance habits:

**1. Clean After Every Project**
Lint and thread debris build up under the needle plate and in the bobbin area. Use the included brush to clean after every project.

**2. Oil Regularly**
Most mechanical machines need 1-2 drops of sewing machine oil in key points monthly. Check your manual for locations.

**3. Change Your Needle Often**
A dull or bent needle causes skipped stitches, thread breaks and fabric damage. Change needles every 8-10 hours of sewing.

**4. Use the Right Needle**
Different fabrics need different needles: ballpoint for knits, sharp for wovens, leather needles for leather. Using wrong needles damages fabrics and the machine.

**5. Wind Bobbins Correctly**
Improperly wound bobbins cause tension problems. Always wind slowly and evenly.

**6. Don't Force Thick Fabric**
If the machine struggles, don't force it. Use a walking foot or adjust the presser foot pressure.

**7. Keep the Machine Covered**
Dust is the enemy. Always cover when not in use.

**8. Have It Serviced Annually**
A professional service every 12 months extends machine life dramatically.

**9. Use Quality Thread**
Cheap thread causes lint buildup and breaks frequently. Invest in quality thread.

**10. Store Properly**
Store at room temperature, away from humidity and direct sunlight.
  `,
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Article not found.</p>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  const content = FULL_CONTENT[post.slug] ?? post.excerpt;
  const related = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero */}
      <div className="relative bg-navy-900 text-white py-14">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-navy-900/80" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="inline-flex items-center gap-1.5 bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
            {post.category}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>{post.author}</span>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime} min read</span>
            </div>
            <span>·</span>
            <span>
              {new Date(post.date).toLocaleDateString('en-NG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Content */}
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-card mb-10">
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            {content.split('\n\n').map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**')) {
                return (
                  <h3 key={i} className="font-bold text-navy-900 text-base mt-6 mb-2">
                    {para.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (para.trim().startsWith('**')) {
                const parts = para.split('**');
                return (
                  <p key={i} className="mb-4">
                    {parts.map((part, j) =>
                      j % 2 === 1 ? (
                        <strong key={j} className="text-navy-900">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
              return para.trim() ? (
                <p key={i} className="mb-4 text-gray-600">
                  {para.trim()}
                </p>
              ) : null;
            })}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="flex items-center gap-1 text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full"
            >
              <Tag className="w-3 h-3" /> {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-navy-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 mb-12">
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold mb-1">Have questions about sewing machines?</p>
            <p className="text-white/60 text-sm">
              Our experts are ready to help you choose the perfect machine for your needs.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4" /> Ask an Expert
          </a>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h3 className="font-bold text-navy-900 text-lg mb-5">More Articles</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map(p => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-card card-hover"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-navy-900 line-clamp-2 group-hover:text-gold-600 transition-colors">
                      {p.title}
                    </p>
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
