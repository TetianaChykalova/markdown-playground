import { useState } from 'react';
import Markdown from 'react-markdown';

import type { MarkdownEditorFile } from '@/utils/types';

import styles from './Editor.module.scss';

export default function Editor({
  activeFile,
  handleChange,
}: {
  activeFile: MarkdownEditorFile;
  handleChange: (newValue: string) => void;
}) {
  const [localContent, setLocalContent] = useState(activeFile.content);

  return (
    <div className={styles.wrapper}>
      <div className={styles.space}>
        <h3>MARKDOWN</h3>
        <textarea
          defaultValue={activeFile.content}
          onChange={(e) => {
            handleChange(e.target.value);
            setLocalContent(e.target.value);
          }}
        />
      </div>
      <div className={styles.space}>
        <h3>PREVIEW</h3>
        <div className={styles.preview}>{<Markdown>{localContent}</Markdown>}</div>
      </div>
    </div>
  );
}
