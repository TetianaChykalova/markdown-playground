import { useMarkdownEditor } from '@/store/store';
import Button from '@/ui/Button';

export default function SaveFile() {
  const updateFile = useMarkdownEditor((s) => s.updateFile);
  const loading = useMarkdownEditor((s) => s.loading);

  return (
    <Button onClick={updateFile} buttonType='action'>
      {loading ? 'Saving...' : 'Save'}
    </Button>
  );
}
