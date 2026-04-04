# 2.1 Basic Webapp Implementation Plan

## Objective

Deliver the first production-ready version of the repository template
dashboard described in the specification, using a phased approach that
reduces risk and keeps the application releasable after each milestone.

## Delivery Strategy

- Start with project foundation and shared architecture.
- Implement the core local data model before building advanced UI
  interactions.
- Deliver repository management before backup alerts and polish.
- Keep every phase testable with Vitest and document key UI states in
  Storybook.

## Target Architecture

### Application Layers

The implementation should follow these layers inside `src`:

- `app`: application bootstrap, routes, providers, theme setup, and
  global layout.
- `models/MyModel/controllers`: orchestrates user actions and UI use
  cases.
- `models/MyModel/services`: business rules for templates, tags,
  import, export, backup freshness, and sharing.
- `models/MyModel/repositories`: IndexedDB access and seed loading.
- `components`: reusable UI building blocks following the repository
  component convention.
- `features`: feature-oriented composition for dashboard, template
  form, tags, import or export, and settings.
- `stories`: optional shared Storybook setup utilities.
- `tests`: shared test utilities and integration helpers.

### Suggested Initial Folder Layout

```text
src/
  app/
    providers/
    theme/
    layout/
  components/
    Header/
    Footer/
    KpiCard/
    RepositoryTemplateCard/
    RepositoryTemplateDialog/
    TagDialog/
    FloatingActions/
  features/
    dashboard/
    repository-templates/
    tags/
    backup/
    preferences/
  models/
    MyModel/
      controllers/
      services/
      repositories/
      types/
  assets/
  tests/
```

### Core Technical Decisions

- Use React with TypeScript and Vite for the application shell.
- Use Material UI and MUI icons for layout, cards, dialogs, actions,
  and theme switching.
- Use React Hook Form for modal forms and validation flows.
- Use IndexedDB behind repository abstractions so the storage
  implementation stays replaceable.
- Use JSON import and export serializers in the service layer rather
  than directly in UI components.
- Use Storybook for component-level review of cards, dialogs, KPIs,
  header, footer, and empty states.
- Use Vitest for unit and integration tests.

## Implementation Phases

### Phase 1: Foundation and Tooling

#### Phase 1 Goals

- Initialize the Vite React TypeScript application with pnpm.
- Install and configure Material UI, MUI icons, React Hook Form,
  Storybook, and Vitest.
- Establish the `MyModel` directory structure and component folder
  convention.
- Add linting, formatting, and test scripts if not already present.

#### Phase 1 Deliverables

- Bootstrapped application.
- Shared MUI theme with dark and light mode support.
- Base application shell with header, footer, and dashboard page
  placeholder.
- Storybook and Vitest configuration committed and working.

#### Phase 1 Exit Criteria

- `pnpm dev`, `pnpm test`, and Storybook start successfully.
- The application renders a responsive shell with no business data yet.

### Phase 2: Domain Model and Persistence

#### Phase 2 Goals

- Define TypeScript models for repository templates, tags, backup
  metadata, and user preferences.
- Implement IndexedDB repositories and a seed initialization flow.
- Load the default `tiogars/template-repository` favorite on first run.
- Persist theme and seeded-favorite visibility preferences.

#### Phase 2 Deliverables

- Repository interfaces and IndexedDB implementations.
- Seed loader and startup initialization logic.
- Backup metadata persistence.

#### Phase 2 Exit Criteria

- Reloading the browser preserves stored data.
- First launch creates the default seeded dataset only once.

### Phase 3: Repository Template Management

#### Phase 3 Goals

- Implement the repository template modal form with React Hook Form.
- Support create, edit, delete, and validation flows.
- Render dashboard cards from persisted data.
- Display repository name, description, link, creation date, update
  date, and share action.

#### Phase 3 Deliverables

- `RepositoryTemplateDialog` component.
- `RepositoryTemplateCard` component.
- Dashboard composition with repository count KPI.
- Share action with native share fallback.

#### Phase 3 Exit Criteria

- A user can fully manage favorite repository templates in the UI.
- The dashboard updates immediately after CRUD actions.

### Phase 4: Tag Management and Filtering Readiness

#### Phase 4 Goals

- Implement tag creation, rename, and deletion in a dedicated modal.
- Allow tag assignment from the repository template form.
- Display tags on repository cards.

#### Phase 4 Deliverables

- `TagDialog` component.
- Tag service and repository integration.
- Updated form and card rendering with tag support.

#### Phase 4 Exit Criteria

- Tags persist correctly and remain associated with repository
  templates after reload.

### Phase 5: Backup Import, Export, and Alerting

#### Phase 5 Goals

- Implement JSON export for the full local dataset.
- Implement JSON import with explicit merge or replace behavior.
- Track last export timestamp and compute stale-backup alerts.
- Display the last backup KPI on the dashboard.

#### Phase 5 Deliverables

- Import and export service.
- Import action flow and export action flow.
- Backup freshness alert component.
- Last-backup KPI component.

#### Phase 5 Exit Criteria

- Export downloads a valid JSON payload.
- Import restores valid data sets.
- The application alerts when no recent export exists.

### Phase 6: UX Completion and Release Hardening

#### Phase 6 Goals

- Finalize Floating Action Button behavior and responsive placement.
- Add documentation link action in the header.
- Finalize footer links and powered-by references.
- Improve empty states, confirmation flows, accessibility labels, and
  keyboard interactions.

#### Phase 6 Deliverables

- Final header and footer implementations.
- Responsive dashboard polish.
- Accessibility and regression test pass.

#### Phase 6 Exit Criteria

- The first usable release meets the specification and passes agreed
  test coverage targets.

## Work Breakdown by Feature

- `Header`: `Header` component with preferences controller and theme
  service.
- `Footer`: `Footer` component with static configuration data.
- `Repository cards`: `RepositoryTemplateCard` with template
  controller and template service.
- `Repository form`: `RepositoryTemplateDialog` with template
  controller validation orchestration.
- `Tags`: `TagDialog` with tag controller and tag service.
- `KPI area`: `KpiCard` with template service and backup service.
- `Floating actions`: `FloatingActions` with controller dispatch for
  modal actions.
- `Import or export`: action dialogs or hidden file input wrappers
  with backup service and repositories.

## Testing Plan

### Unit Tests

- Repository serialization and deserialization.
- Backup freshness computation.
- Seed initialization rules.
- Form validation helpers.
- Merge and replace import behaviors.

### Component Tests

- Header theme toggle behavior.
- Seeded favorite visibility toggle behavior.
- Repository template dialog submission.
- Tag dialog flows.
- KPI rendering.
- Empty dashboard state.

### Integration Tests

- First launch with seeded data.
- Create template then reload and verify persistence.
- Export JSON then verify last backup timestamp update.
- Import JSON in merge mode.
- Import JSON in replace mode.

### Storybook Coverage

- Header in dark and light modes.
- Footer with full link set.
- Repository card with and without tags.
- KPI card variants.
- Repository template dialog states.
- Tag dialog states.
- Empty dashboard and populated dashboard.

## Delivery Milestones

1. Milestone A: foundation, theme, shell, and project conventions.
2. Milestone B: IndexedDB persistence and seeded data.
3. Milestone C: repository template CRUD and dashboard cards.
4. Milestone D: tags, import or export, KPI completion, and alerts.
5. Milestone E: responsive polish, accessibility, tests, and release
   readiness.

## Suggested Backlog Order

1. Bootstrap Vite React TypeScript project with pnpm.
2. Configure MUI theme, icons, Storybook, and Vitest.
3. Create `MyModel` types, repositories, services, and controllers.
4. Implement IndexedDB adapter and seed loading.
5. Build header, footer, and dashboard layout.
6. Build repository template card and KPI card components.
7. Build repository template modal form with validation.
8. Build tag management modal and tag assignment.
9. Build export and import flows.
10. Add stale-backup alerting and last-backup KPI.
11. Add sharing fallback and documentation link.
12. Complete responsive, accessibility, Storybook, and Vitest work.

## Definition of Done

- All specified features are implemented.
- IndexedDB persistence works across reloads.
- Seeded data behaves as specified.
- Import and export flows are validated with tests.
- Core components have Storybook stories.
- Critical business rules have Vitest coverage.
- Responsive behavior is verified on mobile and desktop breakpoints.
- Documentation stays aligned with delivered behavior.
