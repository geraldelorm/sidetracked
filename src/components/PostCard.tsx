import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/notion';

const FALLBACK = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80';

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1 ${
        featured ? 'md:flex-row' : ''
      }`}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Cover image */}
      <div
        className={`relative overflow-hidden shrink-0 ${
          featured ? 'md:w-80 h-52 md:h-auto' : 'h-48'
        }`}
      >
        <Image
          src={post.coverImage || FALLBACK}
          Side={post.title}
          fill
          priority={featured}
          loading={featured ? 'eager' : 'lazy'}
          className='object-cover transition-transform duration-500 group-hover:scale-105'
          sizes={featured ? '(max-width: 768px) 100vw, 320px' : '(max-width: 768px) 100vw, 400px'}
        />
        {/* Category badge */}
        {post.category && (
          <span
            className='absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full'
            style={{
              background: 'var(--bg-card)',
              color: 'var(--accent)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {post.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className='p-5 flex flex-col gap-2.5 flex-1'>
        <h2
          className={`font-bold leading-snug transition-colors group-hover:text-purple-300 ${
            featured ? 'text-xl' : 'text-base'
          }`}
          style={{ color: 'var(--text)' }}
        >
          {post.title}
        </h2>
        {post.excerpt && (
          <p
            className='text-sm leading-relaxed line-clamp-2'
            style={{ color: 'var(--text-muted)' }}
          >
            {post.excerpt}
          </p>
        )}
        <div
          className='flex items-center gap-3 mt-auto pt-3'
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {post.publishedAt && (
            <span className='text-xs' style={{ color: 'var(--text-faint)' }}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className='text-xs px-2 py-0.5 rounded-full'
              style={{ background: 'var(--bg-muted)', color: 'var(--text-faint)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
