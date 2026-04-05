import { create } from 'zustand';

import { db } from '../db/db';
import type { MarkdownEditorFile } from '../utils/types';
import { DEFAULT_CONTENT, DEFAULT_TITLE } from './constants';

interface MarkdownEditorData {
  files: MarkdownEditorFile[];
  activeFile: MarkdownEditorFile | null;
  fileState: 'editing' | 'saved';
  error: string | null;
  loading: boolean;
  history: {
    past: string[];
    current: string;
    future: string[];
  };
}

type MarkdownEditorStore = MarkdownEditorData & {
  init: () => void;
  resetData: () => void;
};

const initialState: MarkdownEditorData = {
  files: [],
  activeFile: null,
  fileState: 'saved',
  error: null,
  loading: false,
  history: {
    past: [],
    current: '',
    future: [],
  },
};

export const useMarkdownEditor = create<MarkdownEditorStore>((set) => ({
  ...initialState,

  init: async () => {
    set({
      loading: true,
    });
    let files = await db.files.toArray();

    if (files.length === 0) {
      try {
        await db.files.add({
          title: DEFAULT_TITLE,
          content: DEFAULT_CONTENT,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        files = await db.files.toArray();
      } catch (error) {
        set({
          error: error as string,
          loading: false,
        });
        console.error(error);
      }
    }
    const activeFile = files[0];

    if (!activeFile) {
      set({
        error: 'something went wrong',
        loading: false,
      });
    }

    set({
      files,
      activeFile: activeFile,
      history: {
        past: [],
        current: activeFile.content,
        future: [],
      },
      loading: false,
    });
  },

  resetData: () => set(initialState),
}));
