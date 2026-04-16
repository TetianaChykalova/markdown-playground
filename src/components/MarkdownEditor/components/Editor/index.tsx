import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
        <h3 className={styles.title}>markdown</h3>
        <textarea
          defaultValue={content}
          onChange={(e) => {
            handleChange(e.target.value);
            setLocalContent(e.target.value);
          }}
        />
      </div>
      <div className={styles.space}>
        <h3 className={styles.title}>preview</h3>
        <div className={styles.preview}>
          {<ReactMarkdown remarkPlugins={[remarkGfm]}>{localContent}</ReactMarkdown>}
        </div>
      </div>
    </div>
  );
}
