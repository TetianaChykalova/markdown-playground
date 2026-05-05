import SaveFile from '@/components/Actions/SaveFile';
import styles from './Actions.module.scss';
import DownloadFile from '@/components/Actions/DownloadFile';
import DeleteFile from '@/components/Actions/DeleteFile';
import RenameFile from '@/components/Actions/RenameFile';

interface ActionsI {
  direction?: 'row' | 'column';

  showRename?: boolean;
  showSave?: boolean;
  showDownload?: boolean;
  showDelete?: boolean;
}

export default function Actions({
  direction = 'row',
  showRename = true,
  showSave = true,
  showDownload = true,
  showDelete = true,
}: ActionsI) {
  return (
    <div className={styles.root} style={{ flexDirection: direction }}>
      {showRename && <RenameFile />}
      {showSave && <SaveFile />}
      {showDownload && <DownloadFile />}
      {showDelete && <DeleteFile />}
    </div>
  );
}
