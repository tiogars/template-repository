import { describe, expect, it } from 'vitest';

import {
  addRepositoryTemplate,
  addTag,
  createDefaultAppDataSet,
  deleteRepositoryTemplate,
  deleteTag,
  importAppDataSet,
  markBackupExported,
  parseImportedAppDataSet,
  serializeAppDataSet,
  shouldDisplayBackupAlert,
  updateRepositoryTemplate,
  updateTag,
} from './appDataService';

describe('appDataService', () => {
  it('marks backup export timestamps on export', () => {
    const dataSet = createDefaultAppDataSet();

    const exported = markBackupExported(dataSet, '2026-04-04T12:00:00.000Z');

    expect(exported.backupMetadata.lastExportAt).toBe('2026-04-04T12:00:00.000Z');
  });

  it('serializes and parses datasets', () => {
    const dataSet = markBackupExported(
      createDefaultAppDataSet(),
      '2026-04-04T12:00:00.000Z',
    );

    const parsed = parseImportedAppDataSet(serializeAppDataSet(dataSet));

    expect(parsed.templates).toHaveLength(1);
    expect(parsed.backupMetadata.lastExportAt).toBe('2026-04-04T12:00:00.000Z');
  });

  it('replaces the current dataset when replace mode is selected', () => {
    const currentDataSet = createDefaultAppDataSet();
    const importedDataSet = {
      ...createDefaultAppDataSet(),
      templates: [
        {
          id: 'imported-template',
          name: 'imported/template',
          url: 'https://github.com/example/imported-template',
          description: 'Imported template',
          templateName: 'imported-template',
          templateOwner: 'example',
          createdAt: '2026-04-01T00:00:00.000Z',
          updatedAt: '2026-04-04T00:00:00.000Z',
          tagIds: [],
          isSeeded: false,
          isVisible: true,
        },
      ],
    };

    const merged = importAppDataSet(currentDataSet, importedDataSet, 'replace');

    expect(merged.templates).toHaveLength(1);
    expect(merged.templates[0]?.id).toBe('imported-template');
  });

  it('merges templates and keeps current preferences in merge mode', () => {
    const currentDataSet = createDefaultAppDataSet();
    currentDataSet.userPreferences.themeMode = 'dark';

    const importedDataSet = {
      ...createDefaultAppDataSet(),
      templates: [
        ...createDefaultAppDataSet().templates,
        {
          id: 'imported-template',
          name: 'imported/template',
          url: 'https://github.com/example/imported-template',
          description: 'Imported template',
          templateName: 'imported-template',
          templateOwner: 'example',
          createdAt: '2026-04-01T00:00:00.000Z',
          updatedAt: '2026-04-04T00:00:00.000Z',
          tagIds: [],
          isSeeded: false,
          isVisible: true,
        },
      ],
      backupMetadata: {
        lastExportAt: '2026-04-04T12:00:00.000Z',
      },
    };

    const merged = importAppDataSet(currentDataSet, importedDataSet, 'merge');

    expect(merged.templates).toHaveLength(2);
    expect(merged.userPreferences.themeMode).toBe('dark');
    expect(merged.backupMetadata.lastExportAt).toBe('2026-04-04T12:00:00.000Z');
  });

  it('flags missing backups as stale', () => {
    expect(shouldDisplayBackupAlert(null)).toBe(true);
  });

  it('updates an existing repository template', () => {
    const dataSet = createDefaultAppDataSet();
    const templateId = dataSet.templates[0].id;

    const updated = updateRepositoryTemplate(dataSet, templateId, {
      name: 'updated/template',
      url: 'https://github.com/example/updated-template',
      description: 'Updated description',
      templateName: 'updated-template',
      templateOwner: 'example',
      tagIds: [],
    });

    expect(updated.templates[0]?.name).toBe('updated/template');
    expect(updated.templates[0]?.description).toBe('Updated description');
  });

  it('deletes a repository template', () => {
    const withExtraTemplate = addRepositoryTemplate(createDefaultAppDataSet(), {
      name: 'extra/template',
      url: 'https://github.com/example/extra-template',
      description: 'Extra template',
      templateName: 'extra-template',
      templateOwner: 'example',
      tagIds: [],
    });
    const createdTemplateId = withExtraTemplate.templates[0].id;

    const updated = deleteRepositoryTemplate(withExtraTemplate, createdTemplateId);

    expect(updated.templates.some((template) => template.id === createdTemplateId)).toBe(false);
  });

  it('renames an existing tag', () => {
    const withTag = addTag(createDefaultAppDataSet(), 'typescript');
    const tagId = withTag.tags[0].id;

    const updated = updateTag(withTag, tagId, 'TypeScript');

    expect(updated.tags[0]?.label).toBe('TypeScript');
  });

  it('deletes a tag and removes its id from all templates', () => {
    const base = createDefaultAppDataSet();
    const withTag = addTag(base, 'cleanup-me');
    const tagId = withTag.tags[0].id;
    const templateId = withTag.templates[0].id;
    const withTagOnTemplate = updateRepositoryTemplate(withTag, templateId, {
      name: withTag.templates[0].name,
      url: withTag.templates[0].url,
      description: withTag.templates[0].description,
      templateName: withTag.templates[0].templateName,
      templateOwner: withTag.templates[0].templateOwner,
      tagIds: [tagId],
    });

    const updated = deleteTag(withTagOnTemplate, tagId);

    expect(updated.tags).toHaveLength(0);
    expect(updated.templates[0]?.tagIds).not.toContain(tagId);
  });
});
