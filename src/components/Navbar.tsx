'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const CATEGORIES = ['Tech', 'Lifestyle', 'Gaming', 'Productivity', 'Opinion'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{ borderBottom: '1px solid var(--border)', background: 'var(--navbar-bg)' }}
      className='sticky top-0 z-50 backdrop-blur-md'
    >
      <div className='max-w-5xl mx-auto px-5 h-14 flex items-center justify-between gap-6'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2 shrink-0'>
          <span className='text-lg font-bold tracking-tight' style={{ color: 'var(--text)' }}>
            Side<span style={{ color: 'var(--accent)' }}>Tracked</span>
          </span>
          <span
            className='text-xs font-medium px-1.5 py-0.5 rounded'
            style={{
              background: 'var(--bg-muted)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            β
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className='hidden md:flex items-center gap-5'>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase()}`}
              className='text-sm transition-colors'
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {cat}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <Link
            href='/about'
            className='hidden md:inline-flex text-sm transition-colors'
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            About
          </Link>

          {/* Hamburger */}
          <button
            className='md:hidden p-1.5 rounded'
            style={{ color: 'var(--text-muted)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Toggle menu'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              {menuOpen ? (
                <path d='M18 6L6 18M6 6l12 12' strokeLinecap='round' />
              ) : (
                <path d='M3 12h18M3 6h18M3 18h18' strokeLinecap='round' />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className='md:hidden px-5 pb-4 pt-2 flex flex-col gap-3'
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase()}`}
              className='text-sm py-1'
              style={{ color: 'var(--text-muted)' }}
              onClick={() => setMenuOpen(false)}
            >
              {cat}
            </Link>
          ))}
          <Link
            href='/about'
            className='text-sm py-1'
            style={{ color: 'var(--text-muted)' }}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}
