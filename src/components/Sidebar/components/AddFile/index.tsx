import { useMarkdownEditor } from '@/store/store';
import Button from '@/ui/Button';

export default function AddFile() {
  const addFile = useMarkdownEditor((state) => state.addFile);

  return (
    <Button onClick={addFile} buttonType='text'>
      Add file
    </Button>
  );
}
