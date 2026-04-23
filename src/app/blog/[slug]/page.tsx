import { getPostBySlug, getAllPosts } from '@/lib/notion';
import AdBanner from '@/components/AdBanner';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);
  if (!result) return {};
  const { post } = result;
  const BLOG_URL = process.env.BLOG_URL ?? 'https://sidetracked-two.vercel.app';
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${BLOG_URL}/blog/${slug}`,
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630 }] : [],
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);
  if (!result) notFound();

  const { post, markdown } = result;

  return (
    <div className='max-w-5xl mx-auto px-5 py-12'>
      {/* Back */}
      <Link
        href='/'
        className='inline-flex items-center gap-1.5 text-sm mb-10 transition-colors'
        style={{ color: 'var(--text-muted)' }}
      >
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path d='M19 12H5M12 5l-7 7 7 7' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
        All posts
      </Link>

      <div className='flex flex-col lg:flex-row gap-10'>
        {/* ── Main content ─────────────────────────────────── */}
        <article className='flex-1 min-w-0'>
          {/* Meta */}
          <div className='flex items-center gap-3 mb-5 flex-wrap'>
            {post.category && (
              <span
                className='text-xs font-semibold px-2.5 py-1 rounded-full'
                style={{
                  background: 'var(--bg-muted)',
                  color: 'var(--accent)',
                  border: '1px solid var(--border)',
                }}
              >
                {post.category}
              </span>
            )}
            {post.publishedAt && (
              <span className='text-xs' style={{ color: 'var(--text-faint)' }}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            )}
            {post.tags.map((tag) => (
              <span
                key={tag}
                className='text-xs px-2 py-0.5 rounded-full'
                style={{ background: 'var(--bg-muted)', color: 'var(--text-faint)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className='text-3xl md:text-4xl font-bold leading-tight mb-4'
            style={{ color: 'var(--text)' }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p className='text-lg leading-relaxed mb-8' style={{ color: 'var(--text-muted)' }}>
              {post.excerpt}
            </p>
          )}

          {/* Cover image */}
          {post.coverImage && (
            <div className='relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-10'>
              <Image
                src={post.coverImage}
                Side={post.title}
                fill
                className='object-cover'
                priority
                sizes='(max-width: 768px) 100vw, 800px'
              />
            </div>
          )}

          {/* In-article ad */}
          <div className='mb-8'>
            <AdBanner slot='horizontal' />
          </div>

          {/* Content */}
          <div className='prose'>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>
        </article>

        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside className='lg:w-64 shrink-0 flex flex-col gap-6'>
          <div className='sticky top-24 flex flex-col gap-6'>
            <AdBanner slot='sidebar' />
            <AdBanner slot='sidebar' />
          </div>
        </aside>
      </div>
    </div>
  );
}
