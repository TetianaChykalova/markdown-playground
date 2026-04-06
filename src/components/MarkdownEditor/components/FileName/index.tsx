import { useMarkdownEditor } from '@/store/store';

export default function FileName() {
  const activeFile = useMarkdownEditor((state) => state.activeFile);
  const renameFile = useMarkdownEditor((state) => state.renameFile);

  if (!activeFile) return null;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const newTitle = e.target.value.trim();
    renameFile(newTitle);
  };

  return (
    <div>
      <input
        key={activeFile.updatedAt}
        name='file-name'
        type='text'
        defaultValue={activeFile.title}
        onBlur={(e) => handleBlur(e)}
      />
    </div>
  );
}
