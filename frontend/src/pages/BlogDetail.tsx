import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { blogPosts } from '@/data/content';
import { fetchBlogBySlug } from '@/lib/api';
import { FiArrowRight } from '@/lib/icons';
import type { BlogPost } from '@/types';

function authorName(author?: BlogPost['author']) {
  if (!author) return 'VisionDeck Team';
  return typeof author === 'string' ? author : author.name;
}

function formatDate(value?: string) {
  if (!value) return 'Latest';
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export default function BlogDetailPage() {
  const { slug = '' } = useParams();
  const fallback = blogPosts.find(post => post.slug === slug);
  const [post, setPost] = useState<BlogPost | undefined>(fallback);

  useEffect(() => {
    let cancelled = false;
    fetchBlogBySlug(slug)
      .then(result => {
        if (!cancelled) setPost(result);
      })
      .catch(() => {
        if (!cancelled) setPost(fallback);
      });
    return () => { cancelled = true; };
  }, [fallback, slug]);

  if (!post) {
    return (
      <>
        <PageHeader eyebrow="Blog" title="Article not found." description="That article may have moved or is not published yet." />
        <section className="py-20">
          <div className="container-x text-center">
            <Link to="/blog" className="btn-gradient text-white font-semibold px-6 py-3 rounded-full">Back to Blog</Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Blog" title={post.title} description={post.excerpt} />
      <article className="py-24 bg-[color:var(--color-gray)]">
        <div className="container-x max-w-4xl">
          {post.coverImage && (
            <img src={post.coverImage} alt={post.title} className="w-full aspect-[16/8] object-cover rounded-2xl border border-[color:var(--color-border)] shadow-[var(--shadow-card)] mb-10" />
          )}
          <div className="bg-white border border-[color:var(--color-border)] rounded-2xl p-7 md:p-10 shadow-[var(--shadow-card)]">
            <div className="flex flex-wrap gap-3 text-sm text-[color:var(--color-muted)] mb-8">
              <span>{authorName(post.author)}</span>
              <span>{formatDate(post.createdAt)}</span>
              {post.readTime && <span>{post.readTime}</span>}
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs font-medium bg-blue-50 text-[color:var(--color-primary)] px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="space-y-5 text-slate-700 leading-relaxed">
              {post.content.split('\n\n').map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link to="/contact?interest=Blog%20reader" className="group inline-flex items-center gap-2 btn-gradient text-white font-semibold px-6 py-3 rounded-full mt-10">
              Talk to an engineer <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
