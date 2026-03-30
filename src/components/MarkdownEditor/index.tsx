import Markdown from 'react-markdown';

import styles from './MarkdownEditor.module.scss';
import { useMarkdownEditor } from '@/store/store';

export default function MarkdownEditor() {
  const activeFile = useMarkdownEditor((state) => state.activeFile);

  if (!activeFile) {
    return <p>loading file...</p>
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <h3>MARKDOWN</h3>
        <textarea defaultValue={activeFile.content} />
      </div>
      <div>
        <h3>PREVIEW</h3>
        <div>
          {<Markdown>{activeFile.content}</Markdown>}
        </div>
      </div>
    </div>
  )
}