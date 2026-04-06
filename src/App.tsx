import { useEffect, useRef } from 'react';

import MarkdownEditor from './components/MarkdownEditor';
import { useMarkdownEditor } from './store/store';

import './styles/global.scss';

import Footer from './components/Footer';
import Header from './components/Header';
import ThemeProvider from './providers/ThemeProvider';

import styles from './App.module.scss';

function App() {
  const loading = useMarkdownEditor((state) => state.loading);
  const error = useMarkdownEditor((state) => state.error);
  const initialized = useRef<null | boolean>(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    useMarkdownEditor.getState().init();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ThemeProvider>
      <div className={styles.root}>
        <Header />
        <main className={styles.content}>
          <MarkdownEditor />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
