# Documentation Conventions

- Write and maintain documentation in English.
- Keep documentation concise, factual, and easy to scan.
- Treat `docs/` as the canonical documentation tree for MkDocs.

## Documentation Structure

- Organize documentation into numbered folders using a hierarchical numeric
  prefix followed by a short topic slug: `1-topic`, `1.1-topic`,
  `1.1.1-topic`, `1.1.1.1-topic`.
- Use clear, stable topic names in folder names so the structure is readable
  without opening each folder.
- Each documentation folder must contain an `index.md` file that defines the
  folder topic, summary, and links to its child sections.
- Use subfolders to represent subsections. A child folder number must extend
  its parent number.
- Keep sibling folders ordered numerically.

## Authoring Rules

- Keep the human-readable section title in `index.md`, and keep the folder
  slug short and descriptive.
- When creating or reorganizing documentation, preserve the hierarchy in both
  the file tree and the MkDocs navigation.
- Update `mkdocs.yml` whenever documentation pages or folders are added,
  removed, or moved.
- Prefer one topic per folder. Use `index.md` as the entry page for that topic.

## Expected Pattern

This is the expected pattern for documentation structure :

- The top-level `docs/` folder contains numbered folders for major sections of
  the documentation.
- Each major section folder contains an `index.md` that defines the section
  and links to its subsections.
- Subsections are organized in subfolders with their own `index.md` files,
  following the same pattern recursively.
- The folder names use a numeric prefix to indicate their position in the
  hierarchy, followed by a descriptive slug.
- Images and other assets are stored in an `images/` subfolder within the
  relevant section folder.

```text
docs/
  1-specification/
    index.md
    1.1-user-stories/
      index.md
      1.1.1-printing/
        images/
          image1.png
        index.md
  2-architecture/
    index.md
```
