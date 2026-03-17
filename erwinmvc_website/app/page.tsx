'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  Zap, Database, Shield, Terminal, Layers, GitBranch,
  ArrowRight, Copy, Check, Code2, Server, Palette
} from 'lucide-react';
import { useState, useEffect } from 'react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Setup',
    description: 'Get from zero to a working web application in seconds with sensible defaults.',
  },
  {
    icon: Server,
    title: 'Express Powered',
    description: 'Built on the fast and minimal Express web framework you already know.',
  },
  {
    icon: Palette,
    title: 'EJS + Alpine.js',
    description: 'Server-side templating with EJS and reactive client components with Alpine.js.',
  },
  {
    icon: Database,
    title: 'Optional Database',
    description: 'Integrate Prisma and PostgreSQL when you need persistence. Start simple, add later.',
  },
  {
    icon: Shield,
    title: 'JWT Authentication',
    description: 'Secure token-based authentication with bcrypt password hashing built-in.',
  },
  {
    icon: Terminal,
    title: 'Powerful CLI',
    description: 'Scaffold applications, generate models and controllers with simple commands.',
  },
];

const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator?.clipboard?.writeText?.(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="code-block text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={copyCode}
        className="absolute top-3 right-3 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default function HomePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="hero-gradient relative py-20 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
              <Zap className="w-4 h-4" />
              Built for Node.js 20+
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              The <span className="gradient-text">TypeScript MVC</span> Framework<br />
              That Gets Out of Your Way
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              A lightweight, full-featured MVC framework with sensible defaults.
              Start simple with routes and views, add features as you grow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/docs"
                className="w-full sm:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://github.com/erwininteractive/typescript-erwinmvc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2"
              >
                <GitBranch className="w-5 h-5" />
                View on GitHub
              </a>
            </div>

            <CodeBlock code="npx @erwininteractive/mvc init myapp && cd myapp && npm run dev" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-slate-900/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need, Nothing You Don't
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Opinionated where it matters for a streamlined experience,
              flexible where you need more control.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features?.map?.((feature, index) => {
              const Icon = feature?.icon;
              return (
                <motion.div
                  key={feature?.title ?? index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-slate-800/50 rounded-2xl card-hover border border-slate-700/50"
                >
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                    {Icon && <Icon className="w-6 h-6 text-blue-400" />}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature?.title}</h3>
                  <p className="text-slate-400">{feature?.description}</p>
                </motion.div>
              );
            }) ?? []}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Up and Running in <span className="gradient-text">Seconds</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                Three commands to your first ErwinMVC application. No complex configuration,
                no boilerplate setup. Just start building.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Initialize your project</h4>
                    <p className="text-slate-400 text-sm">Create a new ErwinMVC application with the CLI</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Enter the directory</h4>
                    <p className="text-slate-400 text-sm">Navigate to your new project folder</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Start developing</h4>
                    <p className="text-slate-400 text-sm">Run the dev server and see your app at localhost:3000</p>
                  </div>
                </div>
              </div>

              <Link
                href="/docs"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all"
              >
                Read the Docs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="space-y-4">
              <CodeBlock code="# Create a new application\nnpx @erwininteractive/mvc init myapp" />
              <CodeBlock code="# Enter the project directory\ncd myapp" />
              <CodeBlock code="# Start the development server\nnpm run dev\n\n# Your app is now running at http://localhost:3000" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <p className="text-slate-400">TypeScript</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <AnimatedCounter value={3} />
              </div>
              <p className="text-slate-400">Commands to Start</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <AnimatedCounter value={0} />
              </div>
              <p className="text-slate-400">Config Required</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">∞</div>
              <p className="text-slate-400">Possibilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Join developers who choose ErwinMVC for its simplicity and power.
              Start your next project in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-blue-600 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/examples"
                className="w-full sm:w-auto px-8 py-4 bg-blue-500/30 hover:bg-blue-500/40 text-white font-semibold rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <Code2 className="w-5 h-5" />
                View Examples
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
