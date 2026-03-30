import { useEffect, useRef } from 'react';
import { useMarkdownEditor } from './store/store';
import MarkdownEditor from './components/MarkdownEditor';

import './styles/global.scss';
import Header from './components/Header';

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
    return <p>{error}</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Header />
      <main>
        <MarkdownEditor />
      </main>
      <footer>Links</footer>
    </>
  )
}

export default App
