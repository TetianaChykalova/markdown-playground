import { useMarkdownEditor } from '@/store/store';

export default function AddFile() {
  const addFile = useMarkdownEditor((state) => state.addFile);

  return <button onClick={addFile}>Add file</button>;
}
