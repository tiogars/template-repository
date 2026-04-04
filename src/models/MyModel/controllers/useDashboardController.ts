import { useEffect, useMemo, useState } from 'react';

import type {
  ImportStrategy,
  NewRepositoryTemplateInput,
  RepositoryTemplate,
  Tag,
  ThemeMode,
} from '../types/domain';
import { IndexedDbAppRepository } from '../repositories/indexedDbAppRepository';
import {
  addRepositoryTemplate,
  addTag,
  createDefaultAppDataSet,
  deleteRepositoryTemplate,
  deleteTag,
  getVisibleTemplates,
  importAppDataSet,
  markBackupExported,
  parseImportedAppDataSet,
  setSeededFavoriteVisibility,
  setThemeMode,
  serializeAppDataSet,
  shouldDisplayBackupAlert,
  updateRepositoryTemplate,
  updateTag,
} from '../services/appDataService';

export interface Feedback {
  message: string;
  severity: 'success' | 'error';
}

export interface DashboardController {
  isLoading: boolean;
  isTemplateDialogOpen: boolean;
  isTagDialogOpen: boolean;
  editingTemplate: RepositoryTemplate | null;
  themeMode: ThemeMode;
  showSeededFavorite: boolean;
  visibleTemplates: ReturnType<typeof getVisibleTemplates>;
  lastBackupAt: string | null;
  tags: Tag[];
  showBackupAlert: boolean;
  feedback: Feedback | null;
  selectedTagIds: string[];
  toggleThemeMode: () => void;
  toggleSeededFavoriteVisibility: () => void;
  openTemplateDialog: () => void;
  openTemplateEditor: (template: RepositoryTemplate) => void;
  closeTemplateDialog: () => void;
  openTagDialog: () => void;
  closeTagDialog: () => void;
  clearFeedback: () => void;
  shareRepositoryTemplate: (url: string, title: string) => Promise<void>;
  toggleTagFilter: (tagId: string) => void;
  clearTagFilter: () => void;
  saveRepositoryTemplate: (input: NewRepositoryTemplateInput) => Promise<void>;
  deleteRepositoryTemplate: (templateId: string) => Promise<void>;
  addTag: (label: string) => Promise<void>;
  updateTag: (tagId: string, label: string) => Promise<void>;
  deleteTag: (tagId: string) => Promise<void>;
  importDataSet: (file: File, strategy: ImportStrategy) => Promise<void>;
  exportDataSet: () => Promise<void>;
}

function downloadJsonFile(content: string, fileName: string) {
  const blob = new Blob([content], { type: 'application/json' });
  const objectUrl = URL.createObjectURL(blob);
  const link = globalThis.document.createElement('a');

  link.href = objectUrl;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(objectUrl);
}

export function useDashboardController(): DashboardController {
  const repository = useMemo(() => new IndexedDbAppRepository(), []);
  const [dataSet, setDataSet] = useState(createDefaultAppDataSet());
  const [isLoading, setIsLoading] = useState(true);
  const [isTemplateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [isTagDialogOpen, setTagDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<RepositoryTemplate | null>(
    null,
  );
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  useEffect(() => {
    void (async () => {
      const storedState = await repository.loadState();
      if (storedState) {
        setDataSet(storedState);
      } else {
        const defaultState = createDefaultAppDataSet();
        setDataSet(defaultState);
        await repository.saveState(defaultState);
      }
      setIsLoading(false);
    })();
  }, [repository]);

  const visibleTemplates = getVisibleTemplates(dataSet, selectedTagIds);

  async function persist(nextDataSet: typeof dataSet) {
    setDataSet(nextDataSet);
    await repository.saveState(nextDataSet);
  }

  return {
    isLoading,
    isTemplateDialogOpen,
    isTagDialogOpen,
    editingTemplate,
    themeMode: dataSet.userPreferences.themeMode,
    showSeededFavorite: dataSet.userPreferences.showSeededFavorite,
    visibleTemplates,
    lastBackupAt: dataSet.backupMetadata.lastExportAt,
    tags: dataSet.tags,
    showBackupAlert: shouldDisplayBackupAlert(
      dataSet.backupMetadata.lastExportAt,
    ),
    feedback,
    clearFeedback: () => setFeedback(null),
    shareRepositoryTemplate: async (url, title) => {
      if (navigator.share) {
        try {
          await navigator.share({ title, url });
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') {
            return;
          }
          // Fall through to clipboard fallback on other errors
        }
      }
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url);
          setFeedback({ message: 'URL copied to clipboard.', severity: 'success' });
          return;
        }
      } catch {
        // Fall through to unsupported message
      }
      setFeedback({ message: 'Sharing is not supported in this browser.', severity: 'error' });
    },
    selectedTagIds,
    toggleTagFilter: (tagId) => {
      setSelectedTagIds((prev) =>
        prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId],
      );
    },
    clearTagFilter: () => setSelectedTagIds([]),
    toggleThemeMode: () => {
      const nextMode: ThemeMode =
        dataSet.userPreferences.themeMode === 'light' ? 'dark' : 'light';
      void persist(setThemeMode(dataSet, nextMode));
    },
    toggleSeededFavoriteVisibility: () => {
      void persist(
        setSeededFavoriteVisibility(
          dataSet,
          !dataSet.userPreferences.showSeededFavorite,
        ),
      );
    },
    openTemplateDialog: () => {
      setEditingTemplate(null);
      setTemplateDialogOpen(true);
    },
    openTemplateEditor: (template) => {
      setEditingTemplate(template);
      setTemplateDialogOpen(true);
    },
    closeTemplateDialog: () => {
      setEditingTemplate(null);
      setTemplateDialogOpen(false);
    },
    openTagDialog: () => setTagDialogOpen(true),
    closeTagDialog: () => setTagDialogOpen(false),
    saveRepositoryTemplate: async (input) => {
      const nextDataSet = editingTemplate
        ? updateRepositoryTemplate(dataSet, editingTemplate.id, input)
        : addRepositoryTemplate(dataSet, input);

      await persist(nextDataSet);
      setEditingTemplate(null);
      setTemplateDialogOpen(false);
    },
    deleteRepositoryTemplate: async (templateId) => {
      await persist(deleteRepositoryTemplate(dataSet, templateId));
      if (editingTemplate?.id === templateId) {
        setEditingTemplate(null);
        setTemplateDialogOpen(false);
      }
    },
    addTag: async (label) => {
      await persist(addTag(dataSet, label));
    },
    updateTag: async (tagId, label) => {
      await persist(updateTag(dataSet, tagId, label));
    },
    deleteTag: async (tagId) => {
      await persist(deleteTag(dataSet, tagId));
      setSelectedTagIds((prev) => prev.filter((id) => id !== tagId));
    },
    importDataSet: async (file, strategy) => {
      try {
        const importedContent = await file.text();
        const importedDataSet = parseImportedAppDataSet(importedContent);
        await persist(importAppDataSet(dataSet, importedDataSet, strategy));
        setFeedback({ message: 'Dataset imported successfully.', severity: 'success' });
      } catch {
        setFeedback({ message: 'Failed to import JSON. The file may be invalid.', severity: 'error' });
      }
    },
    exportDataSet: async () => {
      const exportedAt = new Date().toISOString();
      const nextDataSet = markBackupExported(dataSet, exportedAt);

      await persist(nextDataSet);
      downloadJsonFile(
        serializeAppDataSet(nextDataSet),
        `template-repository-backup-${exportedAt.replaceAll(':', '-').replaceAll('.', '-')}.json`,
      );
      setFeedback({ message: 'Dataset exported successfully.', severity: 'success' });
    },
  };
}
