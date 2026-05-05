import { useState } from 'react';

import { useMarkdownEditor } from '@/store/store';
import Button from '@/ui/Button';

import styles from './DeleteFile.module.scss';

export default function DeleteFile() {
  const activeFile = useMarkdownEditor((s) => s.activeFile);
  const deleteFile = useMarkdownEditor((s) => s.deleteFile);
  const loading = useMarkdownEditor((s) => s.loading);

  const [openConfirmPopup, setOpenConfirmPopup] = useState(false);

  if (!activeFile) return null;

  return (
    <div className={styles.root}>
      <Button onClick={() => setOpenConfirmPopup(true)} buttonType='danger-action'>
        {loading ? 'Deleting...' : 'Delete'}
      </Button>
      {openConfirmPopup && (
        <dialog closedby='none' open className={styles.confirm}>
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
    </div>
  );
}
