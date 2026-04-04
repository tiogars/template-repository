# 2.1.1 Target Architecture

## Application Layers

The implementation should follow these layers inside `src`:

- `app`: application bootstrap, routes, providers, theme setup, and
  global layout.
- `models/<ModelName>/controllers`: orchestrates user actions and UI
  use cases.
- `models/<ModelName>/services`: business rules for templates, tags,
  import, export, backup freshness, and sharing.
- `models/<ModelName>/repositories`: IndexedDB access and seed loading.
- `components`: reusable UI building blocks following the repository
  component convention.
- `features`: feature-oriented composition for dashboard, template
  form, tags, import or export, and settings.
- `stories`: optional shared Storybook setup utilities.
- `tests`: shared test utilities and integration helpers.

## Suggested Initial Folder Layout

The `models/` directory contains **one folder per domain model**. Each
model folder groups its own controllers, services, repositories, and
types. Replace `<ModelName>` with the actual domain model name (for
example `AppData` or `UserProfile`).

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
    <ModelName>/
      controllers/
      services/
      repositories/
      types/
    <AnotherModel>/
      controllers/
      services/
      repositories/
      types/
  assets/
  tests/
```

## Core Technical Decisions

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
