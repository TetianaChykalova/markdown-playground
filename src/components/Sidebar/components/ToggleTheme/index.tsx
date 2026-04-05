import { useTheme } from '@/store/theme';

export default function ToggleTheme() {
  const theme = useTheme((state) => state.theme);
  const setTheme = useTheme((state) => state.setTheme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
