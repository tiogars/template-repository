# 1.1.6 Coding Conventions

This section defines the coding conventions that must be applied
consistently across the entire codebase.

## Arrow Functions

All functions must be written as arrow functions. Named function
declarations are not allowed.

```typescript
// ✅ correct
const fetchRepositoryTemplates = (): RepositoryTemplate[] => {
  return repository.findAll();
};

// ❌ incorrect
function fetchRepositoryTemplates(): RepositoryTemplate[] {
  return repository.findAll();
}
```

## Comments

Comments must explain **why** a decision was made, not **what** the
code does. Avoid redundant comments that merely restate the code.

```typescript
// ✅ correct – explains a non-obvious reason
// IndexedDB transactions are short-lived; open a new one per write
// to avoid "transaction has finished" errors on slow devices.
const saveTemplate = async (template: RepositoryTemplate) => {
  const db = await openDatabase();
  await db.put("templates", template);
};

// ❌ incorrect – restates what the code already says
// Save the template to the database
const saveTemplate = async (template: RepositoryTemplate) => {
  const db = await openDatabase();
  await db.put("templates", template);
};
```

## No Abbreviations

Function names and variable names must use full, descriptive words.
Abbreviations reduce readability and must be avoided.

```typescript
// ✅ correct
const repositoryTemplateCount = templates.length;
const fetchTagsByRepositoryId = (repositoryId: string): Tag[] => {
  return tagRepository.findByRepositoryId(repositoryId);
};

// ❌ incorrect
const repoTmplCnt = templates.length;
const fetchTagsByRepoId = (repoId: string): Tag[] => {
  return tagRepository.findByRepositoryId(repoId);
};
```

## Indentation

Use **2 spaces** for indentation. Tabs are not allowed.

```typescript
// ✅ correct
const applyTagToTemplate = (
  template: RepositoryTemplate,
  tag: Tag,
): RepositoryTemplate => {
  return {
    ...template,
    tags: [...template.tags, tag],
  };
};

// ❌ incorrect (4-space indent)
const applyTagToTemplate = (
    template: RepositoryTemplate,
    tag: Tag,
): RepositoryTemplate => {
    return {
        ...template,
        tags: [...template.tags, tag],
    };
};
```

## Maximum Line Length

Each line of code must not exceed **80 characters**. Long expressions
must be broken across multiple lines.

```typescript
// ✅ correct
const filteredTemplates = repositoryTemplates.filter(
  (template) => template.tags.includes(selectedTag),
);

// ❌ incorrect
const filteredTemplates = repositoryTemplates.filter((template) => template.tags.includes(selectedTag));
```

## File Size Limit

When a file exceeds **200 lines**, consider splitting its content into
separate files. Each file must have a single, clearly scoped
responsibility.

✅ correct – responsibilities are separated:

```plaintext
src/
  services/
    repositoryTemplate/
      createRepositoryTemplate.ts   // ~50 lines
      deleteRepositoryTemplate.ts   // ~30 lines
      listRepositoryTemplates.ts    // ~40 lines
```

❌ incorrect – one file handles everything:

```plaintext
src/
  services/
    repositoryTemplate.ts           // 350 lines
```

## One Operation per File in the Service Layer

In the business service layer, each file must implement exactly one
operation. This keeps logic focused, testable, and easy to locate.

```plaintext
src/
  services/
    tag/
      createTag.ts
      deleteTag.ts
      updateTag.ts
      listTags.ts
    repositoryTemplate/
      createRepositoryTemplate.ts
      deleteRepositoryTemplate.ts
      updateRepositoryTemplate.ts
      listRepositoryTemplates.ts
```

Each service file exports a single arrow function named after the
operation it performs:

```typescript
// src/services/tag/createTag.ts
export const createTag = (name: string): Tag => {
  return tagRepository.save({ id: generateId(), name });
};
```
