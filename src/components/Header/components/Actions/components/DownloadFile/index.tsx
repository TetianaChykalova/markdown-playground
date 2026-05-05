import FileSaver from 'file-saver';

import { useMarkdownEditor } from '@/store/store';
import Button from '@/ui/Button';

export default function DownloadFile() {
  const activeFile = useMarkdownEditor((s) => s.activeFile);

  const handleClick = () => {
    if (!activeFile) return;

    try {
      const file = new File([activeFile.content], `${activeFile.title}.md`, { type: 'text/plain;charset=utf-8' });
      FileSaver.saveAs(file);
    } catch (error) {
      throw new Error('Failed download');
    }
  };

  return (
    <Button onClick={handleClick} buttonType='action'>
      Download
    </Button>
  );
}
