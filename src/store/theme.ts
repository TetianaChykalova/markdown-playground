import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getOSTheme } from './helpers';
import type { Theme } from './types';

interface ThemeData {
  theme: Theme;
}

type ThemeStore = ThemeData & {
  setTheme: (theme: Theme) => void;
};

const initState: ThemeData = {
  theme: getOSTheme(),
};

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      ...initState,
      setTheme: (theme: Theme) => set({ theme }),
    }),
    { name: 'markdown-theme' }
  )
);
