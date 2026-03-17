import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const blogPosts = [
  {
    slug: 'introducing-erwinmvc',
    title: 'Introducing ErwinMVC: A Lightweight TypeScript MVC Framework',
    excerpt: 'ErwinMVC is a new MVC framework for Node.js that prioritizes simplicity and developer experience while providing all the features you need.',
    content: `ErwinMVC is here! After years of working with various Node.js frameworks, I wanted to create something that strikes the perfect balance between simplicity and power.

The philosophy behind ErwinMVC is simple: get from zero to a working web application in seconds, with sensible defaults that just work. No more wrestling with complex configuration files or installing dozens of dependencies before you can write your first route.

Key Features:

• Express Powered - Built on the rock-solid Express framework
• EJS + Alpine.js - Server-side templating with reactive client components
• Optional Database - Add Prisma and PostgreSQL when you need it
• JWT Authentication - Secure authentication out of the box
• CLI Tools - Scaffold projects and generate resources quickly

Getting started is as simple as:

npx @erwininteractive/mvc init myapp
cd myapp
npm run dev

Your app is now running at http://localhost:3000. That's it!

I believe frameworks should grow with your project. Start simple with routes and views, then add a database or authentication when your requirements evolve. ErwinMVC is designed to support this organic growth.

Try it out and let me know what you think!`,
    category: 'Announcements',
    author: 'Andrew S. Erwin',
    publishedAt: new Date('2026-03-01')
  },
  {
    slug: 'getting-started-with-authentication',
    title: 'Getting Started with Authentication in ErwinMVC',
    excerpt: 'Learn how to implement secure user authentication in your ErwinMVC application using the built-in JWT utilities.',
    content: `Authentication is a critical part of most web applications. ErwinMVC makes it easy with built-in JWT utilities and bcrypt password hashing.

Hashing Passwords:

The hashPassword function uses bcrypt to securely hash passwords:

import { hashPassword } from './auth';

const hashedPassword = await hashPassword('userPassword123');
// Store hashedPassword in your database

Verifying Passwords:

When a user logs in, verify their password:

import { verifyPassword } from './auth';

const isValid = await verifyPassword(inputPassword, storedHash);
if (isValid) {
  // Password correct - create session
}

Creating JWT Tokens:

After successful authentication, create a token:

import { signToken } from './auth';

const token = signToken({ userId: user.id, email: user.email });
res.cookie('token', token, { httpOnly: true });

Protecting Routes:

Use the authenticate middleware to protect routes:

import { authenticate } from './auth';

app.get('/dashboard', authenticate, (req, res) => {
  // Only authenticated users can access this
  res.render('dashboard', { user: req.user });
});

The authenticate middleware automatically verifies the JWT token and attaches the decoded user data to req.user.

That's all you need for secure authentication in ErwinMVC!`,
    category: 'Tutorials',
    author: 'Andrew S. Erwin',
    publishedAt: new Date('2026-03-05')
  },
  {
    slug: 'ejs-templating-best-practices',
    title: 'EJS Templating Best Practices',
    excerpt: 'Tips and tricks for writing clean, maintainable EJS templates in your ErwinMVC applications.',
    content: `EJS (Embedded JavaScript) is the templating engine used by ErwinMVC. Here are some best practices to keep your templates clean and maintainable.

1. Use Layouts and Partials

Don't repeat yourself. Create a base layout and include partials:

<%- include('partials/header') %>
<main>
  <%- body %>
</main>
<%- include('partials/footer') %>

2. Escape Output by Default

Always use <%= %> for user-provided content to prevent XSS attacks:

<h1><%= user.name %></h1>  <!-- Safe -->
<h1><%- user.name %></h1>  <!-- Dangerous! -->

Only use <%- %> when you're intentionally rendering trusted HTML.

3. Keep Logic Minimal

Templates should focus on presentation. Move complex logic to controllers:

// Bad - too much logic in template
<% const items = data.filter(d => d.active).sort((a, b) => a.date - b.date) %>

// Good - logic in controller, template just renders
app.get('/items', (req, res) => {
  const items = getActiveItemsSorted();
  res.render('items', { items });
});

4. Use Meaningful Variable Names

Pass clear, descriptive variables to your templates:

res.render('profile', {
  pageTitle: 'User Profile',
  user: currentUser,
  recentPosts: userPosts,
  canEdit: isOwner
});

5. Combine with Alpine.js

Use Alpine.js for interactive components without writing custom JavaScript:

<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open">Content here</div>
</div>

Follow these practices and your templates will be easy to read and maintain!`,
    category: 'Tutorials',
    author: 'Andrew S. Erwin',
    publishedAt: new Date('2026-03-10')
  },
  {
    slug: 'cli-resource-generation',
    title: 'Rapid Development with CLI Resource Generation',
    excerpt: 'Learn how to use the ErwinMVC CLI to generate full CRUD resources in seconds.',
    content: `One of the most powerful features of ErwinMVC is the CLI resource generator. With a single command, you can create a complete CRUD stack for any resource.

Generating a Resource:

npx erwinmvc generate resource Post

This creates:

• prisma/schema.prisma - Adds the Post model
• src/controllers/PostController.ts - Full CRUD controller
• src/views/posts/index.ejs - List all posts
• src/views/posts/show.ejs - Display single post
• src/views/posts/create.ejs - Create form
• src/views/posts/edit.ejs - Edit form

Generated Routes:

The generator sets up RESTful routes following conventions:

GET    /posts          - List all posts
GET    /posts/create   - Show create form
POST   /posts          - Create new post
GET    /posts/:id      - Show single post
GET    /posts/:id/edit - Show edit form
PUT    /posts/:id      - Update post
DELETE /posts/:id      - Delete post

Customizing Generated Code:

The generated code is just a starting point. You can freely modify:

• Add validation to the controller
• Customize the views with your styling
• Add relationships to the model
• Implement authorization checks

Generate Multiple Resources:

Build a complete application quickly:

npx erwinmvc generate resource User
npx erwinmvc generate resource Post
npx erwinmvc generate resource Comment

Each command takes seconds, saving hours of boilerplate coding.

The resource generator follows conventions that are easy to understand and modify, making it perfect for rapid prototyping and production applications alike.`,
    category: 'Tutorials',
    author: 'Andrew S. Erwin',
    publishedAt: new Date('2026-03-15')
  }
];

async function main() {
  console.log('Seeding database...');
  
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        publishedAt: post.publishedAt
      },
      create: post
    });
    console.log(`Upserted: ${post.title}`);
  }
  
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
