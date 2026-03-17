import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'ErwinMVC - Lightweight TypeScript MVC Framework',
  description: 'A lightweight, full-featured MVC framework for Node.js 20+ built with TypeScript. Get from zero to a working web application in seconds.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'ErwinMVC - Lightweight TypeScript MVC Framework',
    description: 'A lightweight, full-featured MVC framework for Node.js 20+ built with TypeScript.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen`} suppressHydrationWarning>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
