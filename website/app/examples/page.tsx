'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Code2, Copy, Check, Play, FileCode, Layers,
  Database, Shield, Server, ArrowRight, Eye, EyeOff
} from 'lucide-react';
import Link from 'next/link';

const CodeBlock = ({ code, language = 'typescript', title }: { code: string; language?: string; title?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator?.clipboard?.writeText?.(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/50">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700/50">
          <span className="text-sm text-slate-400">{title}</span>
          <button
            onClick={copyCode}
            className="p-1.5 hover:bg-slate-700 rounded transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      )}
      <pre className="code-block text-sm overflow-x-auto !rounded-t-none">
        <code className="text-slate-300">{code}</code>
      </pre>
    </div>
  );
};

interface ExampleProps {
  title: string;
  description: string;
  icon: any;
  files: { name: string; code: string; language?: string }[];
}

const Example = ({ title, description, icon: Icon, files }: ExampleProps) => {
  const [activeFile, setActiveFile] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-slate-400">{description}</p>
      </div>
      
      <div className="flex border-b border-slate-700/50 overflow-x-auto">
        {files?.map?.((file, idx) => (
          <button
            key={idx}
            onClick={() => setActiveFile(idx)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeFile === idx
                ? 'text-blue-400 bg-slate-900/50 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileCode className="w-4 h-4 inline mr-2" />
            {file?.name}
          </button>
        )) ?? []}
      </div>
      
      <CodeBlock
        code={files?.[activeFile]?.code ?? ''}
        language={files?.[activeFile]?.language}
      />
    </motion.div>
  );
};

const examples: ExampleProps[] = [
  {
    title: 'Basic Page with Route',
    description: 'Create a simple page with an EJS template and Express route.',
    icon: FileCode,
    files: [
      {
        name: 'views/about.ejs',
        code: `<!doctype html>
<html>
<head>
  <title><%= title %></title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/about" class="active">About</a>
    </nav>
  </header>
  
  <main>
    <h1><%= title %></h1>
    <p><%= description %></p>
    
    <section class="team">
      <h2>Our Team</h2>
      <% team.forEach(member => { %>
        <div class="member">
          <h3><%= member.name %></h3>
          <p><%= member.role %></p>
        </div>
      <% }); %>
    </section>
  </main>
</body>
</html>`,
        language: 'html'
      },
      {
        name: 'server.ts',
        code: `import express from 'express';

const app = express();

// Static files
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// About page route
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    description: 'Learn more about our company.',
    team: [
      { name: 'Alice Johnson', role: 'CEO' },
      { name: 'Bob Smith', role: 'CTO' },
      { name: 'Carol Williams', role: 'Designer' }
    ]
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});`,
        language: 'typescript'
      }
    ]
  },
  {
    title: 'User Authentication',
    description: 'Implement user registration and login with JWT tokens.',
    icon: Shield,
    files: [
      {
        name: 'controllers/AuthController.ts',
        code: `import { Request, Response } from 'express';
import { hashPassword, verifyPassword, signToken } from '../auth';
import { prisma } from '../db';

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  
  // Check if user exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(400).render('auth/register', {
      error: 'Email already registered'
    });
  }
  
  // Hash password and create user
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name }
  });
  
  // Sign token and redirect
  const token = signToken({ userId: user.id, email: user.email });
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/dashboard');
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).render('auth/login', {
      error: 'Invalid credentials'
    });
  }
  
  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return res.status(401).render('auth/login', {
      error: 'Invalid credentials'
    });
  }
  
  const token = signToken({ userId: user.id, email: user.email });
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/dashboard');
};`,
        language: 'typescript'
      },
      {
        name: 'routes.ts',
        code: `import express from 'express';
import { register, login } from './controllers/AuthController';
import { authenticate } from './auth';

const app = express();

// Auth routes
app.get('/register', (req, res) => res.render('auth/register'));
app.post('/register', register);

app.get('/login', (req, res) => res.render('auth/login'));
app.post('/login', login);

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

// Protected route
app.get('/dashboard', authenticate, (req, res) => {
  res.render('dashboard', { user: req.user });
});`,
        language: 'typescript'
      }
    ]
  },
  {
    title: 'CRUD Resource',
    description: 'Full CRUD operations for a blog post resource with Prisma.',
    icon: Database,
    files: [
      {
        name: 'controllers/PostController.ts',
        code: `import { Request, Response } from 'express';
import { prisma } from '../db';

// List all posts
export const index = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });
  res.render('posts/index', { posts });
};

// Show single post
export const show = async (req: Request, res: Response) => {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { author: true }
  });
  if (!post) return res.status(404).render('404');
  res.render('posts/show', { post });
};

// Show create form
export const create = (req: Request, res: Response) => {
  res.render('posts/create');
};

// Store new post
export const store = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: req.user.id
    }
  });
  res.redirect('/posts/' + post.id);
};

// Show edit form
export const edit = async (req: Request, res: Response) => {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  if (!post) return res.status(404).render('404');
  res.render('posts/edit', { post });
};

// Update post
export const update = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  await prisma.post.update({
    where: { id: parseInt(req.params.id) },
    data: { title, content }
  });
  res.redirect('/posts/' + req.params.id);
};

// Delete post
export const destroy = async (req: Request, res: Response) => {
  await prisma.post.delete({
    where: { id: parseInt(req.params.id) }
  });
  res.redirect('/posts');
};`,
        language: 'typescript'
      },
      {
        name: 'prisma/schema.prisma',
        code: `model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  name     String
  password String
  posts    Post[]
}`,
        language: 'prisma'
      }
    ]
  },
  {
    title: 'Alpine.js Interactivity',
    description: 'Add reactive client-side behavior with Alpine.js.',
    icon: Layers,
    files: [
      {
        name: 'views/counter.ejs',
        code: `<!doctype html>
<html>
<head>
  <title>Interactive Counter</title>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body>
  <h1>Alpine.js Counter Example</h1>
  
  <!-- Simple Counter -->
  <div x-data="{ count: 0 }" class="counter-widget">
    <h2>Counter: <span x-text="count"></span></h2>
    <button @click="count--">Decrease</button>
    <button @click="count++">Increase</button>
    <button @click="count = 0">Reset</button>
  </div>
  
  <!-- Todo List -->
  <div x-data="{ todos: [], newTodo: '' }" class="todo-widget">
    <h2>Todo List</h2>
    <form @submit.prevent="todos.push({ text: newTodo, done: false }); newTodo = ''">
      <input x-model="newTodo" placeholder="Add a task...">
      <button type="submit">Add</button>
    </form>
    <ul>
      <template x-for="(todo, index) in todos" :key="index">
        <li>
          <input type="checkbox" x-model="todo.done">
          <span :class="{ 'done': todo.done }" x-text="todo.text"></span>
          <button @click="todos.splice(index, 1)">Delete</button>
        </li>
      </template>
    </ul>
    <p>Total: <span x-text="todos.length"></span></p>
  </div>
</body>
</html>`,
        language: 'html'
      },
      {
        name: 'server.ts',
        code: `import express from 'express';

const app = express();
app.set('view engine', 'ejs');

// Serve the interactive page
app.get('/counter', (req, res) => {
  res.render('counter');
});

app.listen(3000);`,
        language: 'typescript'
      }
    ]
  }
];

export default function ExamplesPage() {
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
            <Code2 className="w-4 h-4" />
            Code Examples
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Learn by <span className="gradient-text">Example</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explore real-world code examples to understand how ErwinMVC works.
            Each example includes multiple files you can copy and use in your project.
          </p>
        </motion.div>

        {/* Examples */}
        <div className="space-y-8">
          {examples?.map?.((example, idx) => (
            <Example key={idx} {...(example ?? {})} />
          )) ?? []}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-6 bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/20 rounded-2xl text-center"
        >
          <h3 className="text-xl font-bold text-white mb-4">Want More Examples?</h3>
          <p className="text-slate-300 mb-6">
            Check out the GitHub repository for more examples and starter templates.
          </p>
          <a
            href="https://github.com/erwininteractive/typescript-erwinmvc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all"
          >
            View on GitHub
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
