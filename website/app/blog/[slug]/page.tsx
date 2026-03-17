import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  
  if (!slug) {
    notFound();
  }

  const post = await prisma?.blogPost?.findUnique?.({
    where: { slug }
  })?.catch?.(() => null);

  if (!post) {
    notFound();
  }

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return '';
    try {
      return new Date(date)?.toLocaleDateString?.('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) ?? '';
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-4">
              {post?.category ?? 'Uncategorized'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {post?.title ?? 'Untitled'}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post?.author ?? 'Unknown'}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post?.publishedAt)}
              </span>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {post?.content ?? ''}
            </div>
          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-slate-700">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
