import { openDB } from 'idb';

import type { AppRepository } from './appRepository';
import type { AppDataSet } from '../types/domain';

const DATABASE_NAME = 'template-repository-webapp';
const STORE_NAME = 'app-state';
const DATASET_KEY = 'dataset';

export class IndexedDbAppRepository implements AppRepository {
  private readonly databasePromise = openDB(DATABASE_NAME, 1, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME);
      }
    },
  });

  async loadState(): Promise<AppDataSet | null> {
    const database = await this.databasePromise;
    return (await database.get(STORE_NAME, DATASET_KEY)) ?? null;
  }

  async saveState(dataSet: AppDataSet): Promise<void> {
    const database = await this.databasePromise;
    await database.put(STORE_NAME, dataSet, DATASET_KEY);
  }
}
