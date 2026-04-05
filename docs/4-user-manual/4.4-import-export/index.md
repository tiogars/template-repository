# 4.4 Import and Export

The application can save your data to a JSON file and restore it from
a previously exported file. Regular exports are recommended to prevent
data loss, since all data is stored locally in the browser.

## Exporting data

1. Open the floating action button menu by clicking the **+** button
   in the bottom-right corner of the screen.
2. Click **Export JSON**.
3. The browser downloads a JSON file containing your full dataset
   (templates, tags, and preferences).
4. The **Last backup** KPI on the dashboard updates to the current
   date and time.

!!! tip
    Keep a copy of the exported file in a safe location (e.g., cloud
    storage or version control) to protect against accidental browser
    data loss.

## Importing data

1. Open the floating action button menu by clicking the **+** button
   in the bottom-right corner of the screen.
2. Click **Import JSON**.
3. Select the JSON file to import using the file picker.
4. Choose an import strategy:
    - **Merge** — adds the imported templates and tags to the existing
      dataset without removing current data. Duplicate entries are
      deduplicated.
    - **Replace** — discards the current dataset entirely and replaces
      it with the content of the imported file.
5. Confirm the action to apply the import.

!!! warning
    The **Replace** strategy permanently overwrites the current
    dataset. Export your data first if you want to keep a backup.

## Stale backup alert

The dashboard displays a warning alert when no export has been
performed within the last 7 days. Export your data to dismiss the
alert and update the **Last backup** KPI.
