# 1.1.1 Functional Specification

## Repository Template Management

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

## Tag Management

- The application must let the user create, rename, and delete tags.
- A repository template can be associated with zero, one, or many tags.
- Tags must be usable to categorize and visually identify repository templates.
- Tag selection must be integrated into the repository template form.

## Dashboard

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

## Header

- The header must contain:
    - an application icon and title
    - a dark or light theme toggle
    - a toggle to show or hide the default seeded favorite
    - a documentation action using a documentation icon
- The documentation action must open the project documentation.

## Floating Action Buttons

- Each primary user action must be reachable from a Floating Action
  Button area.
- The Floating Action Button actions must include:
    - add repository template
    - manage tags
    - import JSON
    - export JSON

## Import and Export

- The application must export the current repository template dataset to JSON.
- The application must import a JSON file and merge or replace local
  data based on an explicit user choice.
- A successful export must update the last backup KPI.
- The application must display an alert when the user has not
  executed a JSON export recently.
- For the first version, a backup is considered stale after 7 days without export.

## Footer

- The footer must contain:
    - `Copyright Tiogars 2026`
    - a `Powered by` area with the main technology references
    - a GitHub repository link with a GitHub icon
    - a GitHub issues link with a bug icon
