import { useEffect, useRef } from 'react';
import styles from './App.module.scss';
import { useMarkdownEditor } from './store/store';

import './styles/global.scss';

function App() {
  const loading = useMarkdownEditor((state) => state.loading);
  const error = useMarkdownEditor((state) => state.error);
  const files = useMarkdownEditor((state) => state.files);
  const initialized = useRef<null | boolean>(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    useMarkdownEditor.getState().init();
  }, []);

  if (error) {
    return <p>{error}</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <header className={styles.title}>Markdown Playground</header>
      <main>
        {
          files.map(file => (
            <div key={file.id}>
              <p>{file.title}</p>
              <textarea defaultValue={file.content} />
            </div>
          ))
        }
      </main>
      <footer>Links</footer>
    </>
  )
}

export default App
