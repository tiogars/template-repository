# 2.1.4 Testing Plan

## Unit Tests

- Repository serialization and deserialization.
- Backup freshness computation.
- Seed initialization rules.
- Form validation helpers.
- Merge and replace import behaviors.

## Component Tests

- Header theme toggle behavior.
- Seeded favorite visibility toggle behavior.
- Repository template dialog submission.
- Tag dialog flows.
- KPI rendering.
- Empty dashboard state.

## Integration Tests

- First launch with seeded data.
- Create template then reload and verify persistence.
- Export JSON then verify last backup timestamp update.
- Import JSON in merge mode.
- Import JSON in replace mode.

## Storybook Coverage

- Header in dark and light modes.
- Footer with full link set.
- Repository card with and without tags.
- KPI card variants.
- Repository template dialog states.
- Tag dialog states.
- Empty dashboard and populated dashboard.
