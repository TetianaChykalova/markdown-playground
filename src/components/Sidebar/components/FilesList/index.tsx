import { useMarkdownEditor } from '@/store/store';

import styles from './FilesList.module.scss';

export default function FilesList({ closeSidebar }: { closeSidebar: () => void }) {
  const files = useMarkdownEditor((state) => state.files);
  const setActiveFile = useMarkdownEditor((state) => state.setActiveFile);

  const handleClick = (id: number) => {
    setActiveFile(id);
    closeSidebar();
  };

  return (
    <div className={styles.content}>
      {files.map((file) => (
        <button key={file.id} onClick={() => handleClick(file.id)}>
          {file.title}
        </button>
      ))}
    </div>
  );
}
