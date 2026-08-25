import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SiteNav = () => {
  const { pathname } = useLocation();
  const onExperience = pathname === '/experience';
  const onBlog = pathname.startsWith('/blog');

  const linkClass = (active = false) =>
    `transition-colors ${active ? 'text-white' : 'text-neutral-400 hover:text-white'}`;

  return (
    <nav className="site-navigation fixed top-0 z-[100] w-full border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link to="/" className="text-xl font-normal tracking-tight text-white transition-opacity hover:opacity-60 sm:text-2xl">
          Anna Sun
        </Link>
        <div className="flex items-center gap-4 text-[13px] font-normal sm:gap-8 sm:text-sm">
          <Link to="/" className={linkClass(pathname === '/')}>Home</Link>
          <Link to="/experience" className={linkClass(onExperience)}>Experience</Link>
          <Link to="/blog" className={linkClass(onBlog)}>Blog</Link>
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
