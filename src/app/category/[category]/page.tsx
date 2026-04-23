import { getAllPosts } from '@/lib/notion';
import PostCard from '@/components/PostCard';
import AdBanner from '@/components/AdBanner';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

const CATEGORIES = ['tech', 'lifestyle', 'gaming', 'productivity', 'opinion'];

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const label = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${label} — SideTracked`,
    description: `All ${label} posts on SideTracked. Tech, life & everything in between.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  if (!CATEGORIES.includes(category.toLowerCase())) notFound();

  const allPosts = await getAllPosts();
  const label = category.charAt(0).toUpperCase() + category.slice(1);
  const posts = allPosts.filter((p) => p.category?.toLowerCase() === category.toLowerCase());

  return (
    <div className='max-w-5xl mx-auto px-5 py-12'>
      {/* Header */}
      <div className='mb-12'>
        <Link
          href='/'
          className='inline-flex items-center gap-1.5 text-sm mb-6 transition-colors'
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

        <div className='flex items-center gap-4 mb-3'>
          <span
            className='text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full'
            style={{
              background: 'var(--bg-muted)',
              color: 'var(--accent)',
              border: '1px solid var(--border)',
            }}
          >
            Category
          </span>
        </div>
        <h1 className='text-4xl md:text-5xl font-bold' style={{ color: 'var(--text)' }}>
          {label}
        </h1>
        <p className='mt-2 text-sm' style={{ color: 'var(--text-muted)' }}>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {/* Ad */}
      <div className='mb-10'>
        <AdBanner slot='horizontal' />
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div
          className='text-center py-24 rounded-2xl'
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <p className='text-4xl mb-4'>🗂️</p>
          <p className='font-semibold mb-1' style={{ color: 'var(--text)' }}>
            Nothing here yet
          </p>
          <p className='text-sm' style={{ color: 'var(--text-muted)' }}>
            Check back soon — posts are on the way.
          </p>
        </div>
      )}

      {/* Bottom ad */}
      <div className='mt-12'>
        <AdBanner slot='horizontal' />
      </div>
    </div>
  );
}
