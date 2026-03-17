import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await prisma?.blogPost?.findMany?.({
      orderBy: { publishedAt: 'desc' }
    })?.catch?.(() => []) ?? [];

    const serializedPosts = (posts ?? [])?.map?.((post) => ({
      ...post,
      id: Number(post?.id ?? 0),
      publishedAt: post?.publishedAt?.toISOString?.() ?? new Date().toISOString(),
      createdAt: post?.createdAt?.toISOString?.() ?? new Date().toISOString(),
      updatedAt: post?.updatedAt?.toISOString?.() ?? new Date().toISOString()
    })) ?? [];

    return NextResponse.json(serializedPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json([], { status: 200 });
  }
}
