import Link from 'next/link';
import { Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
              EM
            </div>
            <span className="text-lg font-semibold text-white">ErwinMVC</span>
          </div>
          
          <nav className="flex items-center gap-6 text-slate-400">
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/api-reference" className="hover:text-white transition-colors">API</Link>
            <Link href="/community" className="hover:text-white transition-colors">Community</Link>
            <a
              href="https://github.com/erwininteractive/typescript-erwinmvc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </nav>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p className="flex items-center justify-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500" /> by{' '}
            <a href="https://andrewthecoder.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              Andrew S. Erwin
            </a>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Erwin Interactive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
