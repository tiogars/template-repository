# 4.2 Repository Templates

Repository templates are the core entities managed by the application.
Each template stores the coordinates of a favourite GitHub repository
together with descriptive metadata.

## Adding a template

1. Open the floating action button menu by clicking the **+** button
   in the bottom-right corner of the screen.
2. Click **Add repository template**.
3. Fill in the form fields:
    - **Name** — the repository name (e.g., `tiogars/template-repository`).
    - **URL** — the full GitHub repository URL.
    - **Description** — a short description of the template.
    - **Creation date** — the date the repository was created.
    - **Last update date** — the date the repository was last updated.
    - **Tags** — one or more tags to categorise the template.
    - **Pin as default favourite** — check this option to mark the
      template as a pinned default.
4. Click **Save** to confirm.

## Editing a template

1. Locate the template card on the dashboard.
2. Click the **edit** icon on the card to open the edit dialog.
3. Modify the fields as needed.
4. Click **Save** to confirm the changes.

## Deleting a template

1. Open the edit dialog for the template you want to remove.
2. Click **Delete** and confirm the action when prompted.

!!! warning
    Deleting a template is permanent. Export your data before
    performing destructive operations if you want to keep a backup.

## Sharing a template

Each template card contains a share action:

- On devices that support the native share API (e.g., most mobile
  browsers), clicking the share icon opens the system share sheet.
- On other devices, the repository URL is copied to the clipboard and
  a confirmation message is shown.

## Default seeded template

On first launch the application pre-loads the
`tiogars/template-repository` repository as a default seeded template.
This template can be shown or hidden using the toggle in the header
without being permanently deleted. See [4.5 Header](../4.5-header/index.md)
for details.
