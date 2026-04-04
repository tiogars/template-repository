export type ThemeMode = 'light' | 'dark';
export type ImportStrategy = 'merge' | 'replace';

export interface RepositoryTemplate {
  id: string;
  name: string;
  url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tagIds: string[];
  isSeeded: boolean;
  isVisible: boolean;
}

export interface Tag {
  id: string;
  label: string;
  color: string;
}

export interface BackupMetadata {
  lastExportAt: string | null;
}

export interface UserPreferences {
  themeMode: ThemeMode;
  showSeededFavorite: boolean;
}

export interface AppDataSet {
  templates: RepositoryTemplate[];
  tags: Tag[];
  backupMetadata: BackupMetadata;
  userPreferences: UserPreferences;
}

export interface NewRepositoryTemplateInput {
  name: string;
  url: string;
  description: string;
  tagIds: string[];
}
