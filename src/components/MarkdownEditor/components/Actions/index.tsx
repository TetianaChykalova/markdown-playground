import DeleteFile from './components/DeleteFile';
import SaveFile from './components/SaveFile';

import styles from './Actions.module.scss';

export default function Actions() {
  return (
    <div className={styles.root}>
      <SaveFile />
      <DeleteFile />
    </div>
  );
}
