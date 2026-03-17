'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Newspaper, Calendar, User, Tag, ArrowRight, Loader2 } from 'lucide-react';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog');
        if (res?.ok) {
          const data = await res?.json?.();
          setPosts(data ?? []);
        }
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = ['all', ...new Set((posts ?? [])?.map?.((post) => post?.category ?? '') ?? [])];
  
  const filteredPosts = selectedCategory === 'all'
    ? posts
    : (posts ?? [])?.filter?.((post) => post?.category === selectedCategory) ?? [];

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr)?.toLocaleDateString?.('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) ?? dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
            <Newspaper className="w-4 h-4" />
            Blog & News
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Latest <span className="gradient-text">Updates</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Stay up to date with the latest news, releases, and tutorials about ErwinMVC.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories?.map?.((category, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(category ?? 'all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {category === 'all' ? 'All Posts' : category}
            </button>
          )) ?? []}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
        ) : filteredPosts?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400">No posts found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts?.map?.((post, idx) => (
              <motion.article
                key={post?.id ?? idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden card-hover group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium">
                      {post?.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {post?.title}
                  </h2>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {post?.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post?.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post?.publishedAt ?? '')}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/blog/${post?.slug}`}
                  className="flex items-center justify-center gap-2 py-3 px-6 bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm font-medium"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.article>
            )) ?? []}
          </div>
        )}
      </div>
    </div>
  );
}
