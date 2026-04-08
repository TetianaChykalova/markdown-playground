import { useState } from 'react';

import { useMarkdownEditor } from '@/store/store';

export default function DeleteFile() {
  const activeFile = useMarkdownEditor((s) => s.activeFile);
  const deleteFile = useMarkdownEditor((s) => s.deleteFile);
  const loading = useMarkdownEditor((s) => s.loading);

  const [openConfirmPopup, setOpenConfirmPopup] = useState(false);

  if (!activeFile) return null;

  return (
    <>
      <button onClick={() => setOpenConfirmPopup(true)}>{loading ? 'Deleting file...' : 'Delete file'}</button>
      {openConfirmPopup && (
        <dialog closedby='none' open>
          <p>Are you sure you want to delete this file?</p>
          <button
            onClick={() => {
              deleteFile(activeFile.id);
              setOpenConfirmPopup(false);
            }}
          >
            Yes
          </button>
          <button onClick={() => setOpenConfirmPopup(false)}>No</button>
        </dialog>
      )}
    </>
  );
}
