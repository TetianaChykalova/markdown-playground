import { useDebouncedCallback } from 'use-debounce';

import { useMarkdownEditor } from '@/store/store';

import Actions from './components/Actions';
import Editor from './components/Editor';

import styles from './MarkdownEditor.module.scss';

export default function MarkdownEditor() {
  const activeFile = useMarkdownEditor((s) => s.activeFile);
  const loading = useMarkdownEditor((s) => s.loading);
  const editFile = useMarkdownEditor((s) => s.editFile);

  if (!activeFile || loading) {
    return <p>loading file...</p>;
  }

  const handleChange = useDebouncedCallback((newValue: string) => {
    editFile(newValue);
  }, 500);

  return (
    <div className={styles.root}>
      <Editor content={activeFile.content} handleChange={handleChange} key={activeFile.id} />
      <div className={styles.actions}>
        <Actions />
      </div>
    </div>
  );
}
