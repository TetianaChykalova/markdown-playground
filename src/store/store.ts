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
  setActiveFile: (id: number) => void;
  addFile: () => void;
  editFile: (content: string) => void;
  updateFile: () => void;
  renameFile: (newTitle: string) => void;
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

export const useMarkdownEditor = create<MarkdownEditorStore>((set, get) => ({
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
      return;
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

  setActiveFile: (id: number) => {
    set({
      loading: true,
    });
    const activeFile = useMarkdownEditor.getState().files.find((f) => f.id === id);
    if (!activeFile) {
      set({
        error: 'File not found',
        loading: false,
      });
      return;
    }
    set({
      activeFile,
      history: {
        past: [],
        current: activeFile.content,
        future: [],
      },
      loading: false,
    });
  },

  addFile: async () => {
    set({
      loading: true,
    });

    let newFilId: number;

    try {
      newFilId = await db.files.add({
        title: DEFAULT_TITLE,
        content: DEFAULT_CONTENT,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    } catch (error) {
      set({
        error: error as string,
        loading: false,
      });
      console.error(error);
    }

    const files = await db.files.toArray();
    const newFile = files.find((f) => f.id === newFilId);

    if (!newFile) {
      set({
        error: 'something went wrong',
        loading: false,
      });
      return;
    }

    set({
      files,
      activeFile: newFile,
      history: {
        past: [],
        current: newFile.content,
        future: [],
      },
      loading: false,
    });
  },

  renameFile: async (newTitle: string) => {
    set({
      loading: true,
    });

    const { activeFile, files } = get();
    if (!activeFile) {
      set({
        loading: false,
      });
      return;
    }

    const updatedAt = Date.now();
    await db.files.update(activeFile.id, { title: newTitle, updatedAt });

    set({
      loading: false,
      files: files.map((f) => (f.id === activeFile.id ? { ...f, title: newTitle, updatedAt } : f)),
      activeFile: { ...activeFile, title: newTitle, updatedAt },
    });
  },

  editFile: (content: string) => {
    const activeFile = get().activeFile;
    if (!activeFile) {
      set({
        error: 'No active file to update',
      });
      return;
    }

    set({
      activeFile: { ...activeFile, content },
      fileState: 'editing',
      history: {
        past: [...get().history.past, get().history.current],
        current: content,
        future: [],
      },
    });
  },

  updateFile: async () => {
    set({
      loading: true,
    });

    const { activeFile } = get();
    if (!activeFile) {
      set({
        loading: false,
      });
      return;
    }

    const updatedAt = Date.now();
    await db.files.update(activeFile.id, { content: activeFile.content, updatedAt });

    const files = await db.files.toArray();

    set({
      loading: false,
      fileState: 'saved',
      files,
      activeFile: { ...activeFile, updatedAt },
    });
  },
}));
