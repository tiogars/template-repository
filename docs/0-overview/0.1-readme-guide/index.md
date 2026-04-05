# 0.1 README Guide

This section describes the purpose and expected content of each section
in the project `README.md` file. Use it as a checklist when creating or
reviewing the README for a project built from this template.

## Logo + Title

Place the project title as a top-level heading on the very first line of the
file, followed by a logo image on the next line, so readers can identify the
project at a glance.

- The first line must be a top-level Markdown heading (`# project-name`).
  This satisfies the `MD041/first-line-heading` linting rule.
- Place the logo image immediately after the heading using a standard
  Markdown image tag.

```markdown
# project-name

![Project logo](assets/images/favicon.png)
```

## Description

A short prose paragraph (two to four sentences) that explains:

- **What** the project is.
- **Who** it is for.
- **Why** it exists or what problem it solves.

Avoid bullet lists here — a paragraph reads more naturally as an
introduction.

## Screenshot

A screenshot showing the webapp in its most representative state. The
recommended view is the dashboard with the **floating action button (FAB)
menu open**, because it exposes all primary actions in a single image.

- Store the screenshot in `assets/images/screenshot-fab-open.png`.
- Use a standard Markdown image tag:

```markdown
![Dashboard with FAB menu open](assets/images/screenshot-fab-open.png)
```

- Retake the screenshot after any significant UI change.

## Features

A bullet list of the main capabilities of the application. Each item
should:

- Start with an emoji or icon that acts as a visual anchor.
- Use **bold** for the feature name.
- Follow with a short description (one sentence).

Example pattern:

```markdown
- 📋 **Repository template management** — add, edit, and delete favourite GitHub
  template repositories.
- 🏷️ **Tag management** — create and delete colour-coded tags to categorise
  templates.
```

## Getting Started

A step-by-step section that lets a new developer run the project locally.
Structure it with two sub-headings:

### Requirements

List the runtime prerequisites as a plain bullet list with links to
official documentation:

```markdown
- [Node.js](https://nodejs.org/) 24 or later
- [pnpm](https://pnpm.io/) 10 or later
```

### Installation

A fenced code block with the minimum shell commands needed to clone the
repository and install dependencies:

```markdown
    ```bash
    git clone https://github.com/org/repo.git
    cd repo
    pnpm install
    ```
```

End the section with the command to start the development server.

## Available Scripts

A Markdown table that lists every `pnpm` script defined in `package.json`
and explains what each one does.

Recommended columns: **Script**, **Description**.

```markdown
| Script | Description |
| ------ | ----------- |
| `pnpm dev` | Start the Vite development server at `http://localhost:5173`. |
| `pnpm build` | Bundle the webapp for production into `dist/`. |
```

Keep the table up-to-date whenever scripts are added or removed.

## Usage Guide

A numbered list of the end-to-end workflows a user follows in the
application. Each step should:

- Use imperative mood ("Click", "Open", "Enter").
- Reference the exact UI element label as shown in the app (**bold**).
- Cross-reference the detailed user manual when applicable.

Example:

```markdown
1. **Browse templates** — the dashboard loads with a seeded list of starter
   templates.
2. **Add a template** — open the FAB (**+**) and click **Add repository
   template**.
```

## Project Structure

A fenced code block using `text` syntax that shows the directory tree of
the repository. Include only the directories and files that are
architecturally significant; omit generated artefacts (`dist/`,
`node_modules/`, etc.). Add inline comments after each entry to explain
its purpose.

````markdown
```text
project/
├── src/
│   ├── app/        # Application shell and providers
│   ├── components/ # Reusable UI components
│   └── models/     # Domain model, services, repository
├── docs/           # MkDocs documentation source
└── package.json
```
````

## Design Highlights

A prose + table section that documents the visual design decisions that
distinguish this project from the default Material UI theme. Include:

- A sub-heading for **Light mode** and one for **Dark mode**, each with a
  four-column table (Role, Colour hex, MUI token, Usage).
- A short bullet list of global design decisions (border radius,
  breakpoints, typography choices, etc.).

This section is the plain-text counterpart to the detailed palette
documentation in
[1.1.3.1 Theme Palette](../../../1-specification/1.1-basic-webapp/1.1.3-user-experience/1.1.3.1-theme-palette/index.md).

## Technology Stack

A Markdown table listing the key technologies with their versions and
roles. Add a badge (shield) to each technology name for visual appeal.

Recommended columns: **Technology** (with badge), **Version**, **Purpose**.

Use [shields.io](https://shields.io/) to generate badges:

```markdown
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
```

List every runtime dependency and the main development tools.

## Storage Architecture

A section that explains how and where the application persists data.
Include:

- A fenced `text` code block that shows the IndexedDB hierarchy
  (database → object store → key → value shape).
- A second `text` block showing the top-level structure of the stored
  value.
- Two or three sentences describing the initialisation flow (seed on
  first load, read on subsequent loads).

## Data Format for Backup

A reference section for developers and power users who interact with the
JSON export file directly. Include:

- A complete, annotated JSON example showing all four top-level keys
  (`templates`, `tags`, `backupMetadata`, `userPreferences`) with
  realistic values.
- A **Field reference** sub-section with one table per domain entity,
  listing each field's name, TypeScript type, and description.

This section allows users to construct or validate backup files manually
and serves as the schema documentation for import/export integration.
