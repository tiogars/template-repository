# 3.2 Open Points

This page lists areas where additional work or refinement would
strengthen the project beyond its current state.

## Documentation

- The i18n plugin is configured for French (`fr`) in `mkdocs.yml`, but no
  translated pages (`*.fr.md`) exist yet. Either create translated pages or
  remove the `fr` locale from the plugin configuration to keep builds clean.
- The Kroki plugin points to a self-hosted server at `kroki.tiogars.fr`. If
  that server is unavailable, diagram rendering will silently fail for readers
  outside the project network. Consider documenting the server dependency or
  falling back to `https://kroki.io`.

## Testing

- The `models/AppData/services/appDataService.tests.ts` file covers the core
  service functions. Additional integration tests that exercise the full
  controller (`useDashboardController`) and the IndexedDB repository would
  improve confidence in persistence flows.
- Storybook stories exist for UI components. Adding interaction tests via
  Storybook's `play` function would extend automated coverage to user-facing
  flows such as form submission and dialog open/close.

## Domain Model

- Tag colours are hard-coded to `#00695c` at creation time. A future iteration
  could let the user pick a colour from a predefined palette, consistent with
  the visual design direction in
  [1.1.3](../../1-specification/1.1-basic-webapp/1.1.3-user-experience/index.md).
- The `isVisible` field on `RepositoryTemplate` is set to `true` at creation
  and never updated by the UI. If this field is intended to support per-template
  visibility toggling independently of the seeded-favorite flag, the feature
  should be exposed to the user or the field should be removed from the domain
  model.

## User Experience

- The share action on each repository card now routes through the
  controller and uses the existing Snackbar feedback system.
  When `navigator.share` is available (e.g., mobile browsers), the
  native share sheet is opened. When only the Clipboard API is
  available, the URL is copied and a "URL copied to clipboard."
  confirmation is shown. If neither API is supported, an error
  message is shown. Previously, the clipboard fallback was silent
  and any share error was discarded.
- The tag filter on the dashboard resets when the page re-mounts. If filtering
  is a frequent action, persisting `selectedTagIds` in `UserPreferences` would
  preserve the user's last filter across sessions.
- Import and export actions currently rely on file dialogs and anchor downloads.
  On iOS Safari and some mobile browsers, the anchor download approach has
  known limitations. Consider testing and documenting browser support for these
  actions.

## Architecture

- The `IndexedDbAppRepository` stores the entire application dataset as a
  single JSON blob under one key. This is simple and sufficient for the current
  scope. If the dataset grows large or partial updates become frequent, a
  normalised store with separate object stores per entity type would be worth
  considering.
- The `useDashboardController` hook manages all application state in a single
  place. As the feature set grows, splitting state into smaller, feature-scoped
  hooks would improve maintainability.
