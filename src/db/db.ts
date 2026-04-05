import { Dexie, type EntityTable } from 'dexie';

import type { MarkdownEditorFile } from '../utils/types';

export const db = new Dexie('markdownFiles') as Dexie & {
  files: EntityTable<MarkdownEditorFile, 'id'>;
};

db.version(1).stores({
  files: '++id, title, content, createdAt, updatedAt',
});
