import { Link } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import { blogPosts as fallbackPosts } from '@/data/content';
import { fetchBlogs } from '@/lib/api';
import { useApiData } from '@/hooks/useApiData';
import { FiArrowRight } from '@/lib/icons';
import { key } from '@/lib/utils';
import type { BlogPost } from '@/types';

function formatDate(value?: string) {
  if (!value) return 'Latest';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export default function BlogPage() {
  const { data: posts } = useApiData<BlogPost[]>(fetchBlogs, fallbackPosts);

  return (
    <>
      <PageHeader eyebrow="Blog" title="Ideas for teams building real products." description="Practical notes on launches, cloud, AI automation, and software delivery." />
      <section className="py-24 bg-[color:var(--color-gray)]">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Reveal key={key(post)} delay={index * 0.06}>
              <article className="bg-white border border-[color:var(--color-border)] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all h-full flex flex-col">
                <Link to={`/blog/${post.slug}`} className="aspect-[16/10] bg-[color:var(--color-dark)] block overflow-hidden">
                  {post.coverImage && <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" loading="lazy" />}
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[color:var(--color-muted)] mb-3">
                    <span>{formatDate(post.createdAt)}</span>
                    {post.readTime && <span>{post.readTime}</span>}
                  </div>
                  <h2 className="font-heading font-semibold text-lg text-[color:var(--color-dark)] mb-3">
                    <Link to={`/blog/${post.slug}`} className="hover:text-[color:var(--color-primary)] transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-[color:var(--color-muted)] leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mt-5 mb-5">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-[11px] font-medium bg-blue-50 text-[color:var(--color-primary)] px-2 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-primary)]">
                    Read article <FiArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
