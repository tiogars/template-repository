# 4.1 Dashboard

The dashboard is the main page of the application. It shows all your
saved repository templates and a set of key performance indicators
(KPIs).

## Reading the KPI cards

Two KPI cards appear at the top of the dashboard:

- **Repository templates** — displays the total number of templates
  currently shown on the dashboard.
- **Last backup** — displays the date and time of the last successful
  JSON export. The card shows a warning when no export has been made
  within the last 7 days.

## Browsing templates

Each repository template is displayed as a card containing:

- the template name
- a short description
- a link to open the GitHub repository in a new tab
- the creation date and last update date
- the tags assigned to the template
- a share action that copies the repository URL to the clipboard or
  opens the native share sheet on supported devices

## Filtering by tag

Tag filter chips appear below the KPI cards when at least one tag
exists. Select one or more chips to restrict the dashboard to templates
that carry those tags. Click a selected chip again to deselect it.
Use the **Clear** action to remove all active filters at once.

## Empty state

When no template matches the active filters, or when no template has
been added yet, the dashboard shows an empty-state message. Use the
floating action buttons to add a new template or to import an existing
dataset.
