import { useDebouncedCallback } from 'use-debounce';

import { useMarkdownEditor } from '@/store/store';

import DeleteFile from './components/DeleteFile';
import Editor from './components/Editor';
import FileName from './components/FileName';
import SaveFile from './components/SaveFile';

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
    <div className={styles.editor}>
      <div className={styles.panel}>
        <FileName />
        <div className={styles.actions}>
          <SaveFile />
          <DeleteFile />
        </div>
      </div>
      <Editor activeFile={activeFile} handleChange={handleChange} key={activeFile.id} />
    </div>
  );
}
