# 1.1.2 Data and Persistence Specification

## IndexedDB

- The application must persist user data in the browser `IndexedDB`.
- IndexedDB must store:
    - repository templates
    - tags
    - UI preferences needed across sessions
    - last export timestamp
- On startup, the application must initialize its local store and
  apply the default JSON seed only when no user dataset exists yet.

## Suggested Domain Model

The first version should use the following conceptual entities:

- `RepositoryTemplate`: favorite GitHub template repository with
  `id`, `name`, `url`, `description`, `createdAt`, `updatedAt`,
  `tagIds`, `isSeeded`, and `isVisible`.
- `Tag`: repository classification with `id`, `label`, and `color`.
- `BackupMetadata`: export freshness tracking with `lastExportAt`.
- `UserPreferences`: persisted UI state with `themeMode` and
  `showSeededFavorite`.
