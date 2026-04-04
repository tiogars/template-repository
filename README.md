# template-repository

A GitHub repository template that ships a React webapp, a MkDocs documentation
site, and a set of GitHub Actions workflows for CI, CD, and documentation
generation.

## Overview

The webapp is a responsive dashboard for managing favourite GitHub repository
templates. It persists data locally in IndexedDB and supports JSON import and
export backups.

## Requirements

- [Node.js](https://nodejs.org/) 20 or later
- [pnpm](https://pnpm.io/) 9 or later

## Quick start

```bash
# Install dependencies
pnpm install

# Start the development server (http://localhost:5173)
pnpm dev

# Run the test suite
pnpm test

# Run type checking
pnpm typecheck

# Start Storybook (http://localhost:6006)
pnpm storybook
```

## Build

```bash
# Build the webapp for production
pnpm build

# Preview the production build locally
pnpm preview

# Build the Storybook static site
pnpm build-storybook
```

## Documentation

The project documentation is built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).
The source files live in the `docs/` directory and the configuration is in
`mkdocs.yml`.

## License

See [LICENSE](LICENSE).
