import { useMarkdownEditor } from '@/store/store';

export default function SaveFile() {
  const updateFile = useMarkdownEditor((s) => s.updateFile);
  const loading = useMarkdownEditor((s) => s.loading);

  return <button onClick={updateFile}>{loading ? 'Saving...' : 'Save'}</button>;
}
