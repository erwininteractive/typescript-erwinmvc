# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@erwininteractive/mvc`, a lightweight MVC framework for Node.js 20+ built with TypeScript. It serves as both:
1. A publishable npm package (`@erwininteractive/mvc`) providing Express-based framework utilities
2. A CLI tool (`erwinmvc`) for scaffolding new applications and generating resources

## Build and Test Commands

```bash
npm run build          # Compile TypeScript + bundle CLI with esbuild
npm run dev            # Run CLI in development mode with tsx
npm test               # Run all tests with Jest
npx jest path/to/test  # Run a specific test file
npx jest -t "pattern"  # Run tests matching a name pattern
```

The build process: TypeScript compilation (`tsc`) outputs to `dist/`, then esbuild bundles `src/cli.ts` into `dist/cli.js` with a shebang added via `scripts/build-cli.js`.

## Architecture

```
src/
├── cli.ts                    # CLI entry point (Commander.js)
├── framework/                # Runtime library (public exports)
│   ├── index.ts              # Public API exports
│   ├── App.ts                # Express app factory (createMvcApp)
│   ├── Auth.ts               # JWT/bcrypt auth + middleware
│   ├── Router.ts             # Convention-based routing auto-loader
│   └── db.ts                 # Prisma client singleton (lazy-loaded)
└── generators/               # Code generation for scaffolding
    ├── initApp.ts            # App scaffolding (erwinmvc init)
    ├── generateModel.ts      # Prisma model generation
    ├── generateController.ts # Controller generation
    └── generateResource.ts   # Full resource (model+controller+views)
templates/                    # EJS templates for code generation
prisma/schema.prisma          # Base schema with User model
```

**Key architectural decisions:**
- **Optional database** - Prisma is lazy-loaded; apps work without it
- **Memory session fallback** - Works without Redis in development
- **Convention-based routing** - Controllers named `*Controller.ts` auto-route via Router.ts
- **Monolithic package** - Framework runtime and CLI shipped together

## CLI Commands

- `erwinmvc init <dir>` - Scaffold new app (options: `--skip-install`, `--with-database`, `--with-ci`)
- `erwinmvc generate model <Name>` - Create Prisma model (option: `--skip-migrate`)
- `erwinmvc generate controller <Name>` - Create CRUD controller (option: `--no-views`)
- `erwinmvc generate resource <Name>` - Generate model + controller + views (options: `--skip-model`, `--skip-controller`, `--skip-views`, `--skip-migrate`, `--api-only`)

## Controller CRUD Convention

Controllers export these methods that map to routes:
- `index` - GET /:resource
- `show` - GET /:resource/:id
- `store` - POST /:resource
- `update` - PUT /:resource/:id
- `destroy` - DELETE /:resource/:id

## Code Style

**Naming:**
- Files: PascalCase for classes (`App.ts`, `UserController.ts`)
- Functions/variables: camelCase (`createMvcApp`, `getPrismaClient`)
- Database tables: snake_case via `@@map()` (`users`)

**Import order:** Node built-ins, external deps, internal imports, type imports

**Error handling pattern:**
```typescript
// Route handlers - try/catch with status codes
try {
  const item = await prisma.model.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
} catch {
  res.status(500).json({ error: "Internal server error" });
}

// CLI - exit with non-zero on failure
console.error(`Error: ${message}`);
process.exit(1);
```

**Type patterns:**
- Use `!` for validated env vars: `process.env.JWT_SECRET!`
- Extend Request: `req: Request & { user?: any }`
- Singleton pattern for Prisma client

## Testing

Tests are in `tests/` directory using Jest with ts-jest preset. Test types include:
- Unit tests (`auth.test.ts`) - Password/token functions
- Generator tests (`generators.test.ts`) - File creation, schema modification
- CLI tests (`cli.test.ts`) - Command execution

Generated code must compile cleanly under strict TypeScript.
