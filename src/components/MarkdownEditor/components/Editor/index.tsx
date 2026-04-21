import MarkdownIt from 'markdown-it';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItDeflist from 'markdown-it-deflist';
import * as MarkdownItEmoji from 'markdown-it-emoji';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItMark from 'markdown-it-mark';
import MarkdownItSub from 'markdown-it-sub';
import MarkdownItSup from 'markdown-it-sup';
import MarkdownItTaskLists from 'markdown-it-task-lists';
import { useState } from 'react';

import styles from './Editor.module.scss';

export default function Editor({
  content,
  handleChange,
}: {
  content: string;
  handleChange: (newValue: string) => void;
}) {
  const [localContent, setLocalContent] = useState(content);

  const md = new MarkdownIt({
    linkify: true,
  })
    .use(MarkdownItEmoji.full)
    .use(MarkdownItSub)
    .use(MarkdownItDeflist)
    .use(MarkdownItTaskLists)
    .use(MarkdownItMark)
    .use(MarkdownItSup)
    .use(MarkdownItAttrs)
    .use(MarkdownItFootnote);

  return (
    <div className={styles.wrapper}>
      <div className={styles.space}>
        <h3 className={styles.title}>markdown</h3>
        <textarea
          id='markdown-editor'
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
          <div dangerouslySetInnerHTML={{ __html: md.render(localContent) }} />
        </div>
      </div>
    </div>
  );
}
