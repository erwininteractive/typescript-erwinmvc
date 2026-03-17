'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Github, Book, Code, Users, FileText, Newspaper } from 'lucide-react';

const navItems = [
  { name: 'Docs', href: '/docs', icon: Book },
  { name: 'API', href: '/api-reference', icon: Code },
  { name: 'Examples', href: '/examples', icon: FileText },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Blog', href: '/blog', icon: Newspaper },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window?.scrollY > 20);
    };
    window?.addEventListener?.('scroll', handleScroll);
    return () => window?.removeEventListener?.('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">
              EM
            </div>
            <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              ErwinMVC
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems?.map?.((item) => {
              const Icon = item?.icon;
              return (
                <Link
                  key={item?.name}
                  href={item?.href ?? '#'}
                  className="flex items-center gap-1.5 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item?.name}
                </Link>
              );
            }) ?? []}
            <a
              href="https://github.com/erwininteractive/typescript-erwinmvc"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
          </nav>

          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800"
        >
          <nav className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems?.map?.((item) => {
              const Icon = item?.icon;
              return (
                <Link
                  key={item?.name}
                  href={item?.href ?? '#'}
                  className="flex items-center gap-2 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  {item?.name}
                </Link>
              );
            }) ?? []}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
