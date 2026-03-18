# Changelog

## [0.3.2](https://github.com/erwininteractive/mvc/compare/v0.3.1...v0.3.2) (2026-03-18)

### Features

- **Content Negotiation:** Added `res.respond()` helper for automatic HTML/JSON response based on Accept header
- **Redis Sessions:** Added Redis-backed session support via `connect-redis`
- **Prisma 6 Compatibility:** Pinned to Prisma v6.19.2+ (v7 has breaking schema changes)

### Bug Fixes

- **CLI Shebang:** Added shebang `#!/usr/bin/env node` to cli.ts source file

### Code Generation

- Updated scaffold templates to use Prisma v6

---

See [CONTRIBUTING.md](CONTRIBUTING.md) for commit message guidelines.
