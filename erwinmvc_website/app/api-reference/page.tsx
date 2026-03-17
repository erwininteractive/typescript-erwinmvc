'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Code, Shield, Server, Database, Terminal, Layers,
  Copy, Check, ChevronDown, ChevronRight, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const CodeBlock = ({ code, language = 'typescript' }: { code: string; language?: string }) => {
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

interface APIItemProps {
  name: string;
  signature: string;
  description: string;
  params?: { name: string; type: string; description: string }[];
  returns?: string;
  example?: string;
}

const APIItem = ({ name, signature, description, params, returns, example }: APIItemProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-slate-700/50 rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 transition-colors text-left"
      >
        <div>
          <code className="text-blue-400 font-semibold">{name}</code>
          <p className="text-slate-400 text-sm mt-1">{description}</p>
        </div>
        {expanded ? (
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
      </button>
      
      {expanded && (
        <div className="p-4 bg-slate-900/50 border-t border-slate-700/50">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Signature</h4>
            <code className="text-green-400 text-sm">{signature}</code>
          </div>
          
          {params && params?.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Parameters</h4>
              <div className="space-y-2">
                {params?.map?.((param, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <code className="text-blue-400">{param?.name}</code>
                    <span className="text-slate-500">:</span>
                    <code className="text-yellow-400">{param?.type}</code>
                    <span className="text-slate-400">- {param?.description}</span>
                  </div>
                )) ?? []}
              </div>
            </div>
          )}
          
          {returns && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Returns</h4>
              <code className="text-purple-400">{returns}</code>
            </div>
          )}
          
          {example && (
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Example</h4>
              <CodeBlock code={example} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const apiCategories = [
  {
    title: 'Authentication',
    icon: Shield,
    description: 'JWT-based authentication utilities',
    items: [
      {
        name: 'hashPassword',
        signature: 'hashPassword(password: string): Promise<string>',
        description: 'Hashes a plain text password using bcrypt',
        params: [
          { name: 'password', type: 'string', description: 'The plain text password to hash' }
        ],
        returns: 'Promise<string> - The hashed password',
        example: `const hashedPassword = await hashPassword('mySecurePassword123');\nconsole.log(hashedPassword); // $2b$10$...`
      },
      {
        name: 'verifyPassword',
        signature: 'verifyPassword(password: string, hash: string): Promise<boolean>',
        description: 'Verifies a password against a bcrypt hash',
        params: [
          { name: 'password', type: 'string', description: 'The plain text password to verify' },
          { name: 'hash', type: 'string', description: 'The bcrypt hash to compare against' }
        ],
        returns: 'Promise<boolean> - True if password matches, false otherwise',
        example: `const isValid = await verifyPassword('myPassword', storedHash);\nif (isValid) {\n  console.log('Password is correct!');\n}`
      },
      {
        name: 'signToken',
        signature: 'signToken(payload: object): string',
        description: 'Signs a JWT token with the given payload',
        params: [
          { name: 'payload', type: 'object', description: 'The data to encode in the token' }
        ],
        returns: 'string - The signed JWT token',
        example: `const token = signToken({ userId: 123, role: 'admin' });\nres.cookie('token', token);`
      },
      {
        name: 'verifyToken',
        signature: 'verifyToken(token: string): object | null',
        description: 'Verifies and decodes a JWT token',
        params: [
          { name: 'token', type: 'string', description: 'The JWT token to verify' }
        ],
        returns: 'object | null - The decoded payload or null if invalid',
        example: `const decoded = verifyToken(req.cookies.token);\nif (decoded) {\n  console.log('User ID:', decoded.userId);\n}`
      },
      {
        name: 'authenticate',
        signature: 'authenticate: RequestHandler',
        description: 'Express middleware for protecting routes',
        params: [],
        returns: 'RequestHandler - Express middleware function',
        example: `// Protect a route\napp.get('/dashboard', authenticate, (req, res) => {\n  res.render('dashboard', { user: req.user });\n});`
      }
    ]
  },
  {
    title: 'CLI Commands',
    icon: Terminal,
    description: 'Command-line tools for scaffolding and generation',
    items: [
      {
        name: 'init',
        signature: 'npx @erwininteractive/mvc init <project-name>',
        description: 'Initialize a new ErwinMVC project',
        params: [
          { name: 'project-name', type: 'string', description: 'Name of the project directory to create' }
        ],
        returns: 'Creates a new project directory with all necessary files',
        example: `npx @erwininteractive/mvc init my-awesome-app`
      },
      {
        name: 'generate resource',
        signature: 'npx erwinmvc generate resource <ResourceName>',
        description: 'Generate a full CRUD stack for a resource',
        params: [
          { name: 'ResourceName', type: 'string', description: 'Name of the resource (PascalCase)' }
        ],
        returns: 'Creates model, controller, and view templates',
        example: `npx erwinmvc generate resource Post\n# Creates:\n# - prisma/schema.prisma (model)\n# - src/controllers/PostController.ts\n# - src/views/posts/index.ejs\n# - src/views/posts/show.ejs\n# - src/views/posts/create.ejs\n# - src/views/posts/edit.ejs`
      }
    ]
  },
  {
    title: 'Express Integration',
    icon: Server,
    description: 'Express app configuration and middleware',
    items: [
      {
        name: 'app.get',
        signature: 'app.get(path: string, ...handlers: RequestHandler[]): void',
        description: 'Define a GET route handler',
        params: [
          { name: 'path', type: 'string', description: 'The URL path to match' },
          { name: 'handlers', type: 'RequestHandler[]', description: 'Middleware and route handlers' }
        ],
        returns: 'void',
        example: `app.get('/users/:id', (req, res) => {\n  const userId = req.params.id;\n  res.render('users/show', { userId });\n});`
      },
      {
        name: 'res.render',
        signature: 'res.render(view: string, locals?: object): void',
        description: 'Render an EJS template with data',
        params: [
          { name: 'view', type: 'string', description: 'The view template name (without .ejs)' },
          { name: 'locals', type: 'object', description: 'Data to pass to the template' }
        ],
        returns: 'void - Sends HTML response to client',
        example: `app.get('/profile', authenticate, (req, res) => {\n  res.render('profile', {\n    title: 'My Profile',\n    user: req.user\n  });\n});`
      }
    ]
  }
];

const routeTable = [
  { action: 'index', method: 'GET', url: '/posts', description: 'List all posts' },
  { action: 'create', method: 'GET', url: '/posts/create', description: 'Show create form' },
  { action: 'store', method: 'POST', url: '/posts', description: 'Create a new post' },
  { action: 'show', method: 'GET', url: '/posts/:id', description: 'Show a single post' },
  { action: 'edit', method: 'GET', url: '/posts/:id/edit', description: 'Show edit form' },
  { action: 'update', method: 'PUT', url: '/posts/:id', description: 'Update a post' },
  { action: 'destroy', method: 'DELETE', url: '/posts/:id', description: 'Delete a post' },
];

export default function APIReferencePage() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
            <Code className="w-4 h-4" />
            API Reference
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Complete <span className="gradient-text">API Reference</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Detailed documentation of all ErwinMVC functions, methods, and CLI commands.
            Click on any item to expand and see full details.
          </p>
        </motion.div>

        {/* API Categories */}
        <div className="space-y-12">
          {apiCategories?.map?.((category, idx) => {
            const Icon = category?.icon;
            return (
              <motion.section
                key={category?.title ?? idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    {Icon && <Icon className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{category?.title}</h2>
                    <p className="text-slate-400 text-sm">{category?.description}</p>
                  </div>
                </div>
                
                <div>
                  {category?.items?.map?.((item, itemIdx) => (
                    <APIItem key={itemIdx} {...(item ?? {})} />
                  )) ?? []}
                </div>
              </motion.section>
            );
          }) ?? []}
        </div>

        {/* Resource Routes Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Layers className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Resource Routes</h2>
              <p className="text-slate-400 text-sm">Routes generated by the resource generator</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-slate-800/50 rounded-xl overflow-hidden">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="py-4 px-6 text-slate-300 font-semibold">Action</th>
                  <th className="py-4 px-6 text-slate-300 font-semibold">Method</th>
                  <th className="py-4 px-6 text-slate-300 font-semibold">URL</th>
                  <th className="py-4 px-6 text-slate-300 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {routeTable?.map?.((route, idx) => (
                  <tr key={idx} className="border-b border-slate-700/50 last:border-0">
                    <td className="py-4 px-6 text-white">{route?.action}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        route?.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                        route?.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                        route?.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {route?.method}
                      </span>
                    </td>
                    <td className="py-4 px-6"><code className="text-blue-400">{route?.url}</code></td>
                    <td className="py-4 px-6 text-slate-400">{route?.description}</td>
                  </tr>
                )) ?? []}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-6 bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/20 rounded-2xl text-center"
        >
          <h3 className="text-xl font-bold text-white mb-4">Ready to See It in Action?</h3>
          <p className="text-slate-300 mb-6">
            Check out our code examples to see these APIs used in real-world scenarios.
          </p>
          <Link
            href="/examples"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all"
          >
            View Examples
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
