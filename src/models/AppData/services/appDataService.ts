import seededTemplates from '../../../assets/defaultRepositoryTemplates.json';
import type {
  AppDataSet,
  ImportStrategy,
  NewRepositoryTemplateInput,
  RepositoryTemplate,
  Tag,
  ThemeMode,
} from '../types/domain';

const STALE_BACKUP_DAYS = 7;

function createSeededTemplates(): RepositoryTemplate[] {
  return seededTemplates.map((template) => ({
    ...template,
    tagIds: template.tagIds ?? [],
    isSeeded: true,
    isVisible: true,
  }));
}

export function createDefaultAppDataSet(): AppDataSet {
  return {
    templates: createSeededTemplates(),
    tags: [],
    backupMetadata: {
      lastExportAt: null,
    },
    userPreferences: {
      themeMode: 'light',
      showSeededFavorite: true,
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function sanitizeTemplate(value: unknown): RepositoryTemplate | null {
  if (!isRecord(value)) {
    return null;
  }

  const { id, name, url, description, templateName, templateOwner, createdAt, updatedAt, tagIds } = value;

  if (
    typeof id !== 'string' ||
    typeof name !== 'string' ||
    typeof url !== 'string' ||
    typeof description !== 'string' ||
    typeof createdAt !== 'string' ||
    typeof updatedAt !== 'string'
  ) {
    return null;
  }

  return {
    id,
    name,
    url,
    description,
    templateName: typeof templateName === 'string' ? templateName : '',
    templateOwner: typeof templateOwner === 'string' ? templateOwner : '',
    createdAt,
    updatedAt,
    tagIds: Array.isArray(tagIds)
      ? tagIds.filter((tagId): tagId is string => typeof tagId === 'string')
      : [],
    isSeeded: value.isSeeded === true,
    isVisible: value.isVisible !== false,
  };
}

function sanitizeTag(value: unknown): Tag | null {
  if (!isRecord(value)) {
    return null;
  }

  const { id, label, color } = value;
  if (
    typeof id !== 'string' ||
    typeof label !== 'string' ||
    typeof color !== 'string'
  ) {
    return null;
  }

  return { id, label, color };
}

function latestTimestamp(
  left: string | null,
  right: string | null,
): string | null {
  if (!left) {
    return right;
  }

  if (!right) {
    return left;
  }

  return new Date(left).getTime() >= new Date(right).getTime() ? left : right;
}

function mergeById<T extends { id: string }>(
  currentItems: T[],
  importedItems: T[],
): T[] {
  const items = new Map(currentItems.map((item) => [item.id, item]));

  for (const importedItem of importedItems) {
    items.set(importedItem.id, importedItem);
  }

  return Array.from(items.values());
}

export function parseImportedAppDataSet(jsonContent: string): AppDataSet {
  const parsed = JSON.parse(jsonContent) as unknown;

  if (!isRecord(parsed)) {
    throw new Error('Imported JSON must contain a valid application dataset.');
  }

  const templates = Array.isArray(parsed.templates)
    ? parsed.templates
        .map((template) => sanitizeTemplate(template))
        .filter((template): template is RepositoryTemplate => template !== null)
    : null;
  const tags = Array.isArray(parsed.tags)
    ? parsed.tags
        .map((tag) => sanitizeTag(tag))
        .filter((tag): tag is Tag => tag !== null)
    : null;

  if (!templates || !tags) {
    throw new Error('Imported JSON is missing repository templates or tags.');
  }

  const userPreferences = isRecord(parsed.userPreferences)
    ? {
        themeMode: (parsed.userPreferences.themeMode === 'dark'
          ? 'dark'
          : 'light') as ThemeMode,
        showSeededFavorite: parsed.userPreferences.showSeededFavorite !== false,
      }
    : createDefaultAppDataSet().userPreferences;

  const backupMetadata = isRecord(parsed.backupMetadata)
    ? {
        lastExportAt:
          typeof parsed.backupMetadata.lastExportAt === 'string'
            ? parsed.backupMetadata.lastExportAt
            : null,
      }
    : { lastExportAt: null };

  return {
    templates,
    tags,
    userPreferences,
    backupMetadata,
  };
}

export function importAppDataSet(
  currentDataSet: AppDataSet,
  importedDataSet: AppDataSet,
  strategy: ImportStrategy,
): AppDataSet {
  if (strategy === 'replace') {
    return importedDataSet;
  }

  return {
    templates: mergeById(currentDataSet.templates, importedDataSet.templates),
    tags: mergeById(currentDataSet.tags, importedDataSet.tags),
    userPreferences: currentDataSet.userPreferences,
    backupMetadata: {
      lastExportAt: latestTimestamp(
        currentDataSet.backupMetadata.lastExportAt,
        importedDataSet.backupMetadata.lastExportAt,
      ),
    },
  };
}

export function markBackupExported(
  dataSet: AppDataSet,
  exportedAt = new Date().toISOString(),
): AppDataSet {
  return {
    ...dataSet,
    backupMetadata: {
      lastExportAt: exportedAt,
    },
  };
}

export function serializeAppDataSet(dataSet: AppDataSet): string {
  return JSON.stringify(dataSet, null, 2);
}

export function setThemeMode(dataSet: AppDataSet, themeMode: ThemeMode): AppDataSet {
  return {
    ...dataSet,
    userPreferences: {
      ...dataSet.userPreferences,
      themeMode,
    },
  };
}

export function setSeededFavoriteVisibility(
  dataSet: AppDataSet,
  showSeededFavorite: boolean,
): AppDataSet {
  return {
    ...dataSet,
    userPreferences: {
      ...dataSet.userPreferences,
      showSeededFavorite,
    },
  };
}

export function addRepositoryTemplate(
  dataSet: AppDataSet,
  input: NewRepositoryTemplateInput,
): AppDataSet {
  const now = new Date().toISOString();
  const template: RepositoryTemplate = {
    id: crypto.randomUUID(),
    name: input.name,
    url: input.url,
    description: input.description,
    templateName: input.templateName,
    templateOwner: input.templateOwner,
    createdAt: now,
    updatedAt: now,
    tagIds: input.tagIds,
    isSeeded: false,
    isVisible: true,
  };

  return {
    ...dataSet,
    templates: [template, ...dataSet.templates],
  };
}

export function updateRepositoryTemplate(
  dataSet: AppDataSet,
  templateId: string,
  input: NewRepositoryTemplateInput,
): AppDataSet {
  const now = new Date().toISOString();

  return {
    ...dataSet,
    templates: dataSet.templates.map((template) => {
      if (template.id !== templateId) {
        return template;
      }

      return {
        ...template,
        name: input.name,
        url: input.url,
        description: input.description,
        templateName: input.templateName,
        templateOwner: input.templateOwner,
        tagIds: input.tagIds,
        updatedAt: now,
      };
    }),
  };
}

export function deleteRepositoryTemplate(
  dataSet: AppDataSet,
  templateId: string,
): AppDataSet {
  return {
    ...dataSet,
    templates: dataSet.templates.filter((template) => template.id !== templateId),
  };
}

export function addTag(dataSet: AppDataSet, label: string): AppDataSet {
  const normalizedLabel = label.trim();
  if (!normalizedLabel) {
    return dataSet;
  }

  const exists = dataSet.tags.some(
    (tag) => tag.label.toLowerCase() === normalizedLabel.toLowerCase(),
  );
  if (exists) {
    return dataSet;
  }

  const tag: Tag = {
    id: crypto.randomUUID(),
    label: normalizedLabel,
    color: '#00695c',
  };

  return {
    ...dataSet,
    tags: [...dataSet.tags, tag],
  };
}

export function updateTag(
  dataSet: AppDataSet,
  tagId: string,
  label: string,
): AppDataSet {
  const normalizedLabel = label.trim();
  if (!normalizedLabel) {
    return dataSet;
  }

  return {
    ...dataSet,
    tags: dataSet.tags.map((tag) =>
      tag.id === tagId ? { ...tag, label: normalizedLabel } : tag,
    ),
  };
}

export function deleteTag(dataSet: AppDataSet, tagId: string): AppDataSet {
  return {
    ...dataSet,
    tags: dataSet.tags.filter((tag) => tag.id !== tagId),
    templates: dataSet.templates.map((template) => ({
      ...template,
      tagIds: template.tagIds.filter((id) => id !== tagId),
    })),
  };
}

export function getVisibleTemplates(
  dataSet: AppDataSet,
  selectedTagIds: string[] = [],
): RepositoryTemplate[] {
  return dataSet.templates.filter((template) => {
    if (!dataSet.userPreferences.showSeededFavorite && template.isSeeded) {
      return false;
    }

    if (!template.isVisible) {
      return false;
    }

    if (selectedTagIds.length === 0) {
      return true;
    }

    return selectedTagIds.some((tagId) => template.tagIds.includes(tagId));
  });
}

export function shouldDisplayBackupAlert(lastExportAt: string | null): boolean {
  if (!lastExportAt) {
    return true;
  }

  const lastBackup = new Date(lastExportAt).getTime();
  const diffInDays = (Date.now() - lastBackup) / (1000 * 60 * 60 * 24);

  return diffInDays >= STALE_BACKUP_DAYS;
}
