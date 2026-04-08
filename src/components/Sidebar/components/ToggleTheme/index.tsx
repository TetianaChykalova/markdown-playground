import { useTheme } from '@/store/theme';

import { DarkMode, LightMode } from './icons';

import styles from './ToggleTheme.module.scss';

export default function ToggleTheme() {
  const theme = useTheme((state) => state.theme);
  const setTheme = useTheme((state) => state.setTheme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={styles.container}>
      <DarkMode />
      <button onClick={toggleTheme} className={styles.button}>
        <span className={styles.circle} data-theme={theme} />
      </button>
      <LightMode />
    </div>
  );
}
