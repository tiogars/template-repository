# 1.1 Basic Webapp

## Goal

Build a responsive webapp that helps a user manage favorite GitHub
repository templates from a card-based dashboard, with local
persistence and JSON backup capabilities.

## Scope

The webapp targets a single end user and stores data locally in the
browser. No server-side persistence or authentication is required in
the first version.

## Functional Specification

### Repository Template Management

- The application must let the user create, edit, and delete favorite
  GitHub repository templates from a modal dialog containing a form.
- The form must support at least the following fields:
    - repository name
    - repository URL
    - description
    - creation date
    - last update date
    - tags
    - pinned as default favorite flag
- A default JSON seed must be bundled with the application and must
  contain the repository `tiogars/template-repository`.
- The seeded repository must be proposed as a favorite on first launch.
- The header must expose a toggle that lets the user show or hide the
  seeded favorite repository from the dashboard without deleting it.

### Tag Management

- The application must let the user create, rename, and delete tags.
- A repository template can be associated with zero, one, or many tags.
- Tags must be usable to categorize and visually identify repository templates.
- Tag selection must be integrated into the repository template form.

### Dashboard

- Repository templates must be displayed in a dashboard composed of cards.
- Each card must display:
    - the template repository name
    - a description
    - a link to open the GitHub repository
    - the creation date
    - the last update date
    - a share action
- The dashboard must provide a KPI showing the total number of
  repository templates currently displayed.
- The dashboard must provide a KPI showing the date and time of the
  last successful JSON backup export.
- The dashboard should support empty-state messaging when no
  repository template is available.

### Header

- The header must contain:
    - an application icon and title
    - a dark or light theme toggle
    - a toggle to show or hide the default seeded favorite
    - a documentation action using a documentation icon
- The documentation action must open the project documentation.

### Floating Action Buttons

- Each primary user action must be reachable from a Floating Action
  Button area.
- The Floating Action Button actions must include:
    - add repository template
    - manage tags
    - import JSON
    - export JSON

### Import and Export

- The application must export the current repository template dataset to JSON.
- The application must import a JSON file and merge or replace local
  data based on an explicit user choice.
- A successful export must update the last backup KPI.
- The application must display an alert when the user has not
  executed a JSON export recently.
- For the first version, a backup is considered stale after 7 days without export.

### Footer

- The footer must contain:
    - `Copyright Tiogars 2026`
    - a `Powered by` area with the main technology references
    - a GitHub repository link with a GitHub icon
    - a GitHub issues link with a bug icon

## Data and Persistence Specification

### IndexedDB

- The application must persist user data in the browser `IndexedDB`.
- IndexedDB must store:
    - repository templates
    - tags
    - UI preferences needed across sessions
    - last export timestamp
- On startup, the application must initialize its local store and
  apply the default JSON seed only when no user dataset exists yet.

### Suggested Domain Model

The first version should use the following conceptual entities:

- `RepositoryTemplate`: favorite GitHub template repository with
  `id`, `name`, `url`, `description`, `createdAt`, `updatedAt`,
  `tagIds`, `isSeeded`, and `isVisible`.
- `Tag`: repository classification with `id`, `label`, and `color`.
- `BackupMetadata`: export freshness tracking with `lastExportAt`.
- `UserPreferences`: persisted UI state with `themeMode` and
  `showSeededFavorite`.

## User Experience Specification

### Responsive Behavior

- The webapp must be usable on mobile, tablet, and desktop screens.
- Cards and Floating Action Buttons must remain accessible on narrow
  viewports.
- The header and footer must remain readable and operable on small screens.

### Sharing

- The share action on each card should use the browser sharing
  capabilities when available.
- When native sharing is unavailable, the application should provide
  a fallback such as copying the repository URL.

### Visual Design Direction

- The application must use Material UI components and icons.
- Light and dark theme variants must be supported through a shared
  MUI theme configuration.
- KPI panels, cards, modal forms, and Floating Action Buttons should
  form a cohesive dashboard experience.

## Technical Stack

The implementation must use the following stack:

- [Material UI](https://mui.com/material-ui/)
- [MUI theme customization](https://mui.com/material-ui/customization/theming/)
- [MUI icons](https://mui.com/material-ui/material-icons/)
- Responsive webapp design with
  [Material UI breakpoints](https://mui.com/material-ui/customization/breakpoints/)
- [pnpm](https://pnpm.io/)
- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/)

## Technical Methodology

### Model-Driven Development

The solution must follow a model-driven development approach centered
on a `MyModel` domain boundary.

`MyModel` must define at least:

- services
- controllers
- repositories

### Component Folder Convention

Reusable UI components must follow this structure inside `src/components/MyComponent`:

```text
src/
  components/
    MyComponent/
      index.tsx
      MyComponent.types.ts
      MyComponent.stories.tsx
      MyComponent.css
      MyComponent.tests.tsx
```

The component convention must be applied consistently to dashboard
widgets, form dialogs, KPIs, header actions, footer actions, and
shared layout components.

## Acceptance Criteria

- A user can manage favorite repository templates from a modal form.
- A user can manage tags and assign them to repository templates.
- The default favorite `tiogars/template-repository` is preloaded and
  can be shown or hidden from the header.
- The dashboard displays repository cards, the repository count KPI,
  and the last backup KPI.
- Import and export actions work with JSON files.
- Local data persists across browser reloads through IndexedDB.
- A stale-backup alert appears when no recent export exists.
- The UI supports dark and light themes and remains responsive.
