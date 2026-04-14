import DeleteFile from './components/DeleteFile';
import FileName from './components/FileName';
import SaveFile from './components/SaveFile';

import styles from './Actions.module.scss';

export default function Actions() {
  return (
    <div className={styles.root}>
      <FileName />
      <SaveFile />
      <DeleteFile />
    </div>
  );
}
