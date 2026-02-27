# Contributing to @erwininteractive/mvc

Thank you for your interest in contributing to the Erwin MVC framework! This
document provides guidelines for contributing effectively.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Working on Issues](#working-on-issues)
3. [Git Workflow](#git-workflow)
4. [Branch Naming](#branch-naming)
5. [Commit Messages](#commit-messages)
6. [Pull Requests](#pull-requests)
7. [Adding Issues](#adding-issues)

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/erwinmvc.git
   cd erwinmvc
   ```

3. **Set up the upstream remote**:

   ```bash
   git remote add upstream https://github.com/erwininteractive/erwinmvc.git
   ```

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Run tests** to ensure everything works:

   ```bash
   npm test
   ```

---

## Working on Issues

### Claiming an Issue

**Always comment on an issue before starting work** to avoid duplicate effort:

1. Navigate to the issue you want to work on
2. Comment: "I'd like to work on this" or "Working on this now"
3. If someone else has claimed it but hasn't updated in 2+ weeks, politely ask if you can take over

### Issue Labels

- `bug` - Something is broken
- `enhancement` - New feature or improvement
- `good first issue` - Good for newcomers
- `documentation` - Documentation improvements
- `cli` - Related to CLI commands
- `auth` - Authentication-related
- `docker` - Docker/Compose issues

---

## Git Workflow

### Keeping Your Fork Updated

Before starting new work:

```bash
# Checkout main branch
git checkout main

# Fetch upstream changes
git fetch upstream

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

### Feature Branch Workflow

```bash
# Create and checkout a new branch
git checkout -b feature/your-branch-name

# Make your changes
# ... edit files ...

# Stage changes
git add .

# Commit with a good message
git commit -m "feat: add authenticate middleware export"

# Push to your fork
git push origin feature/your-branch-name

# Create a Pull Request on GitHub
```

---

## Branch Naming

Use these prefixes to categorize branches:

| Prefix      | Use For          | Example                       |
| ----------- | ---------------- | ----------------------------- |
| `feat/`     | New features     | `feat/export-auth-middleware` |
| `fix/`      | Bug fixes        | `fix/prisma-version-pin`      |
| `docs/`     | Documentation    | `docs/contributing-guide`     |
| `refactor/` | Code refactoring | `refactor/simplify-router`    |
| `test/`     | Test additions   | `test/auth-middleware`        |
| `chore/`    | Maintenance      | `chore/update-dependencies`   |

### Naming Rules

1. **Use lowercase with hyphens** (kebab-case)
2. **Keep it concise but descriptive** (max 50 chars)
3. **Include issue number** when applicable: `fix/#3-docker-ports`
4. **No personal names** in branch names

**Good Examples:**

- `feat/#5-export-authenticate-middleware`
- `fix/prisma-7-compatibility`
- `docs/setup-instructions`

**Bad Examples:**

- `john-fix`
- `random-changes`
- `feature_branch_name`
- `WIP`

---

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style (formatting, semicolons)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Build process, dependencies

### Format Rules

1. **Subject line**: Maximum 50 characters, imperative mood ("add" not "added")
2. **Body** (optional): Wrap at 72 characters, explain what and why
3. **Footer** (optional): Reference issues: `Fixes #123`, `Closes #456`

**Good Examples:**

```
feat(auth): export authenticate middleware for route protection

The framework's Auth module now exports the authenticate middleware
function, allowing users to protect routes without implementing
their own JWT verification logic.

Closes #5
```

```
fix(prisma): pin Prisma version to ^6.0.0 in scaffold template

Prisma 7+ has breaking changes with datasource url property.
Pinning to v6 ensures migrations work out of the box.

Fixes #2
```

**Bad Examples:**

```
fixed stuff
updated code
WIP
added feature
```

---

## Pull Requests

### Creating a Pull Request

1. **Push your branch** to your fork
2. **Go to GitHub** and click "Compare & pull request"
3. **Select the correct base**: `erwininteractive/mvc:main`
4. **Fill in the PR template** (if provided)

### PR Title Format

```
[<TYPE>] <Description>
```

Examples:

- `[FEATURE] Export authenticate middleware for route protection`
- `[BUG] Pin Prisma to ^6.0.0 to fix migration failures`
- `[DOCS] Add contributing guidelines`

### PR Description Template

```markdown
## Summary

Brief description of changes

## Related Issue

Fixes #123

## Changes Made

- Change 1
- Change 2
- Change 3

## Testing

How did you test these changes?

## Checklist

- [ ] Tests pass (`npm test`)
- [ ] Code follows style guidelines
- [ ] Documentation updated (if needed)
- [ ] Issue referenced in PR description
```

### Review Process

1. **Wait for CI checks** to pass
2. **Address review comments** promptly
3. **Keep the PR focused** - one feature/fix per PR
4. **Update your branch** if main has moved forward:

   ```bash
   git fetch upstream
   git rebase upstream/main
   git push --force-with-lease origin your-branch
   ```

### Merging

- Use **"Squash and merge"** for feature branches
- Use **"Rebase and merge"** for clean, single-commit PRs
- Delete your branch after merging

---

## Adding Issues

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check closed issues** - your issue might already be resolved
3. **Try latest version** - the issue might be fixed

### Issue Format

Use this template for bug reports:

```markdown
## Bug Description

Clear description of the bug

## Steps to Reproduce

1. Step one
2. Step two
3. Step three

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- Node.js version:
- OS:
- Package version:

## Additional Context

Screenshots, logs, or other helpful information
```

Use this template for feature requests:

```markdown
## Feature Request

Clear description of the feature

## Current Behavior

How it works now

## Desired Behavior

How you want it to work

## Proposed Solution

Your idea for implementation (optional)

## Use Case

Why this feature is needed

## Additional Context

Any other relevant information
```

### Issue Title Guidelines

1. **Prefix with type**: `[BUG]`, `[FEATURE]`, `[DOCS]`
2. **Be specific**: "Fix auth middleware" vs "Auth issue"
3. **Keep it concise**: Under 60 characters if possible

**Good Examples:**

- `[BUG] Prisma 7+ breaking change with datasource url`
- `[FEATURE] Add cookie-parser to scaffold dependencies`
- `[DOCS] Add Docker setup instructions`

**Bad Examples:**

- `broken`
- `help`
- `feature request`
- `Not working`

### Labels

Apply appropriate labels when creating issues:

- Use `bug` for broken functionality
- Use `enhancement` for new features
- Use `good first issue` for beginner-friendly tasks
- Use `documentation` for docs improvements

---

## Code Style

### TypeScript

- Use strict mode
- Explicit return types for public APIs
- Use `!` for validated env vars

### Naming

- **Files**: PascalCase for classes (`Auth.ts`)
- **Functions**: camelCase (`hashPassword`)
- **Variables**: camelCase (`userData`)
- **Constants**: UPPER_SNAKE_CASE for env vars

### Imports

```typescript
// 1. Node built-ins
import path from "path";

// 2. External dependencies
import express from "express";

// 3. Internal imports
import { getPrismaClient } from "./db";

// 4. Types
import type { Request, Response } from "express";
```

---

## Questions?

- **General questions**: Open a discussion or comment on relevant issue
- **Security issues**: Email <security@erwininteractive.com> directly
- **Quick questions**: Check existing documentation first

Thank you for contributing!

---

## Quick Reference

```bash
# Start new feature
git checkout main
git fetch upstream
git merge upstream/main
git checkout -b feat/my-feature

# Make commits
git add .
git commit -m "feat: description"

# Push and PR
git push origin feat/my-feature
# Create PR on GitHub

# Update branch with main
git fetch upstream
git rebase upstream/main
git push --force-with-lease origin feat/my-feature
```
