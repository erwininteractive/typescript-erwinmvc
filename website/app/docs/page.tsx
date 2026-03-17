'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  BookOpen, Terminal, Folder, FileCode, Database,
  Settings, ArrowRight, Copy, Check, Layers, Shield, Server
} from 'lucide-react';
import { useState } from 'react';

const CodeBlock = ({ code, language = 'bash' }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator?.clipboard?.writeText?.(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="code-block text-sm overflow-x-auto">
        <code className="text-slate-300">{code}</code>
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

const Section = ({ id, icon: Icon, title, children }: { id: string; icon: any; title: string; children: React.ReactNode }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
};

const tableOfContents = [
  { id: 'installation', title: 'Installation', icon: Terminal },
  { id: 'project-structure', title: 'Project Structure', icon: Folder },
  { id: 'creating-pages', title: 'Creating Pages', icon: FileCode },
  { id: 'ejs-templates', title: 'EJS Templates', icon: Layers },
  { id: 'database', title: 'Database Setup', icon: Database },
  { id: 'authentication', title: 'Authentication', icon: Shield },
  { id: 'cli-commands', title: 'CLI Commands', icon: Settings },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
            <BookOpen className="w-4 h-4" />
            Documentation
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Getting Started with <span className="gradient-text">ErwinMVC</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Learn how to build web applications with ErwinMVC. From installation to deployment,
            this guide covers everything you need to know.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">On This Page</h3>
              <nav className="space-y-1">
                {tableOfContents?.map?.((item) => (
                  <a
                    key={item?.id}
                    href={`#${item?.id}`}
                    className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors text-sm"
                  >
                    <item.icon className="w-4 h-4" />
                    {item?.title}
                  </a>
                )) ?? []}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            <Section id="installation" icon={Terminal} title="Installation">
              <p className="text-slate-300 mb-6">
                Getting started with ErwinMVC is simple. You'll need Node.js 20 or higher installed on your system.
              </p>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Create a New Application</h3>
                <CodeBlock code={`npx @erwininteractive/mvc init myapp`} />
                
                <h3 className="text-lg font-semibold text-white mt-6">Enter the Directory</h3>
                <CodeBlock code={`cd myapp`} />
                
                <h3 className="text-lg font-semibold text-white mt-6">Start Development Server</h3>
                <CodeBlock code={`npm run dev`} />
                
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl mt-6">
                  <p className="text-blue-300">
                    <strong>Success!</strong> Your application is now running at <code className="bg-blue-500/20 px-2 py-1 rounded">http://localhost:3000</code>
                  </p>
                </div>
              </div>
            </Section>

            <Section id="project-structure" icon={Folder} title="Project Structure">
              <p className="text-slate-300 mb-6">
                A new ErwinMVC project has a clean, organized structure:
              </p>
              <CodeBlock code={`myapp/
├── src/                # Main application code
│   ├── server.ts       # Application entry point
│   ├── controllers/    # Route controllers
│   └── views/          # EJS templates
├── public/             # Static files (CSS, JS, images)
├── prisma/             # Database schema (if used)
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration`} />
            </Section>

            <Section id="creating-pages" icon={FileCode} title="Creating Pages">
              <p className="text-slate-300 mb-6">
                Creating a new page in ErwinMVC is straightforward. You need a view template and a route.
              </p>
              
              <h3 className="text-lg font-semibold text-white mb-3">1. Create an EJS View</h3>
              <p className="text-slate-400 mb-3">Create a file at <code className="bg-slate-700 px-2 py-1 rounded">src/views/about.ejs</code>:</p>
              <CodeBlock code={`<!doctype html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1><%= title %></h1>
  <p>Welcome to my about page!</p>
</body>
</html>`} />

              <h3 className="text-lg font-semibold text-white mb-3 mt-6">2. Add a Route</h3>
              <p className="text-slate-400 mb-3">In <code className="bg-slate-700 px-2 py-1 rounded">src/server.ts</code>, add:</p>
              <CodeBlock code={`app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});`} />
            </Section>

            <Section id="ejs-templates" icon={Layers} title="EJS Templates">
              <p className="text-slate-300 mb-6">
                ErwinMVC uses EJS (Embedded JavaScript) for templating. Here are the key syntax patterns:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Output a Variable (Escaped)</h3>
                  <CodeBlock code={`<h1><%= title %></h1>`} />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Output Raw HTML</h3>
                  <CodeBlock code={`<%- htmlContent %>`} />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">JavaScript Logic</h3>
                  <CodeBlock code={`<% if (user) { %>
  <p>Welcome, <%= user.name %>!</p>
<% } else { %>
  <p>Please log in.</p>
<% } %>`} />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Loops</h3>
                  <CodeBlock code={`<ul>
<% items.forEach(item => { %>
  <li><%= item.name %></li>
<% }); %>
</ul>`} />
                </div>
              </div>
            </Section>

            <Section id="database" icon={Database} title="Database Setup">
              <p className="text-slate-300 mb-6">
                ErwinMVC supports optional database integration with Prisma and PostgreSQL.
              </p>
              
              <h3 className="text-lg font-semibold text-white mb-3">Configure Database URL</h3>
              <p className="text-slate-400 mb-3">Add to your <code className="bg-slate-700 px-2 py-1 rounded">.env</code> file:</p>
              <CodeBlock code={`DATABASE_URL="postgresql://user:password@localhost:5432/mydb"`} />
              
              <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl mt-6">
                <h4 className="font-semibold text-white mb-2">Tip: Optional by Design</h4>
                <p className="text-slate-400 text-sm">
                  You don't need a database to start. ErwinMVC lets you add persistence when your project needs it.
                </p>
              </div>
            </Section>

            <Section id="authentication" icon={Shield} title="Authentication">
              <p className="text-slate-300 mb-6">
                ErwinMVC includes JWT authentication utilities out of the box.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Available Functions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="py-3 px-4 text-slate-300 font-semibold">Function</th>
                        <th className="py-3 px-4 text-slate-300 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4"><code className="text-blue-400">hashPassword(password)</code></td>
                        <td className="py-3 px-4 text-slate-400">Hashes a password using bcrypt</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4"><code className="text-blue-400">verifyPassword(password, hash)</code></td>
                        <td className="py-3 px-4 text-slate-400">Verifies a password against a hash</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4"><code className="text-blue-400">signToken(payload)</code></td>
                        <td className="py-3 px-4 text-slate-400">Signs a JWT token</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4"><code className="text-blue-400">verifyToken(token)</code></td>
                        <td className="py-3 px-4 text-slate-400">Verifies and decodes a JWT token</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4"><code className="text-blue-400">authenticate</code></td>
                        <td className="py-3 px-4 text-slate-400">Express middleware for protecting routes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Section>

            <Section id="cli-commands" icon={Settings} title="CLI Commands">
              <p className="text-slate-300 mb-6">
                ErwinMVC provides powerful CLI tools for scaffolding and code generation.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Initialize a New Project</h3>
                  <CodeBlock code={`npx @erwininteractive/mvc init <project-name>`} />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Generate a Resource (Full CRUD)</h3>
                  <CodeBlock code={`npx erwinmvc generate resource Post`} />
                  <p className="text-slate-400 mt-3 text-sm">
                    This creates a model, controller, and view templates for the resource.
                  </p>
                </div>
              </div>
            </Section>

            {/* Next Steps */}
            <div className="p-6 bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/20 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">What's Next?</h3>
              <p className="text-slate-300 mb-6">
                Now that you know the basics, explore the API reference for detailed documentation
                or check out code examples for real-world patterns.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/api-reference"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
                >
                  API Reference
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/examples"
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all"
                >
                  View Examples
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
