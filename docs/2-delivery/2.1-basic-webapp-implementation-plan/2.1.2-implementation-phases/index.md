# 2.1.2 Implementation Phases

## Phase 1: Foundation and Tooling

### Phase 1 Goals

- Initialize the Vite React TypeScript application with pnpm.
- Install and configure Material UI, MUI icons, React Hook Form,
  Storybook, and Vitest.
- Establish the `MyModel` directory structure and component folder
  convention.
- Add linting, formatting, and test scripts if not already present.

### Phase 1 Deliverables

- Bootstrapped application.
- Shared MUI theme with dark and light mode support.
- Base application shell with header, footer, and dashboard page
  placeholder.
- Storybook and Vitest configuration committed and working.

### Phase 1 Exit Criteria

- `pnpm dev`, `pnpm test`, and Storybook start successfully.
- The application renders a responsive shell with no business data yet.

## Phase 2: Domain Model and Persistence

### Phase 2 Goals

- Define TypeScript models for repository templates, tags, backup
  metadata, and user preferences.
- Implement IndexedDB repositories and a seed initialization flow.
- Load the default `tiogars/template-repository` favorite on first run.
- Persist theme and seeded-favorite visibility preferences.

### Phase 2 Deliverables

- Repository interfaces and IndexedDB implementations.
- Seed loader and startup initialization logic.
- Backup metadata persistence.

### Phase 2 Exit Criteria

- Reloading the browser preserves stored data.
- First launch creates the default seeded dataset only once.

## Phase 3: Repository Template Management

### Phase 3 Goals

- Implement the repository template modal form with React Hook Form.
- Support create, edit, delete, and validation flows.
- Render dashboard cards from persisted data.
- Display repository name, description, link, creation date, update
  date, and share action.

### Phase 3 Deliverables

- `RepositoryTemplateDialog` component.
- `RepositoryTemplateCard` component.
- Dashboard composition with repository count KPI.
- Share action with native share fallback.

### Phase 3 Exit Criteria

- A user can fully manage favorite repository templates in the UI.
- The dashboard updates immediately after CRUD actions.

## Phase 4: Tag Management and Filtering Readiness

### Phase 4 Goals

- Implement tag creation, rename, and deletion in a dedicated modal.
- Allow tag assignment from the repository template form.
- Display tags on repository cards.

### Phase 4 Deliverables

- `TagDialog` component.
- Tag service and repository integration.
- Updated form and card rendering with tag support.

### Phase 4 Exit Criteria

- Tags persist correctly and remain associated with repository
  templates after reload.

## Phase 5: Backup Import, Export, and Alerting

### Phase 5 Goals

- Implement JSON export for the full local dataset.
- Implement JSON import with explicit merge or replace behavior.
- Track last export timestamp and compute stale-backup alerts.
- Display the last backup KPI on the dashboard.

### Phase 5 Deliverables

- Import and export service.
- Import action flow and export action flow.
- Backup freshness alert component.
- Last-backup KPI component.

### Phase 5 Exit Criteria

- Export downloads a valid JSON payload.
- Import restores valid data sets.
- The application alerts when no recent export exists.

## Phase 6: UX Completion and Release Hardening

### Phase 6 Goals

- Finalize Floating Action Button behavior and responsive placement.
- Add documentation link action in the header.
- Finalize footer links and powered-by references.
- Improve empty states, confirmation flows, accessibility labels, and
  keyboard interactions.

### Phase 6 Deliverables

- Final header and footer implementations.
- Responsive dashboard polish.
- Accessibility and regression test pass.

### Phase 6 Exit Criteria

- The first usable release meets the specification and passes agreed
  test coverage targets.
