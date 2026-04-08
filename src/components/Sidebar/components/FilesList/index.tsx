import { useMarkdownEditor } from '@/store/store';
import Button from '@/ui/Button';

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
        <Button key={file.id} onClick={() => handleClick(file.id)} buttonType='list-item'>
          {file.title}
        </Button>
      ))}
    </div>
  );
}
