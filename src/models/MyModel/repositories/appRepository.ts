import type { AppDataSet } from '../types/domain';

export interface AppRepository {
  loadState(): Promise<AppDataSet | null>;
  saveState(dataSet: AppDataSet): Promise<void>;
}
