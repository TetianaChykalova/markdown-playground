import { useState } from 'react';
import Markdown from 'react-markdown';

import styles from './Editor.module.scss';

export default function Editor({
  content,
  handleChange,
}: {
  content: string;
  handleChange: (newValue: string) => void;
}) {
  const [localContent, setLocalContent] = useState(content);

  return (
    <div className={styles.wrapper}>
      <div className={styles.space}>
        <h3 className={styles.title}>MARKDOWN</h3>
        <textarea
          defaultValue={content}
          onChange={(e) => {
            handleChange(e.target.value);
            setLocalContent(e.target.value);
          }}
        />
      </div>
      <div className={styles.space}>
        <h3 className={styles.title}>PREVIEW</h3>
        <div className={styles.preview}>{<Markdown>{localContent}</Markdown>}</div>
      </div>
    </div>
  );
}
