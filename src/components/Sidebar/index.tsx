import { AnimatePresence, motion } from 'framer-motion';

import AddFile from './components/AddFile';
import FilesList from './components/FilesList';
import ToggleTheme from './components/ToggleTheme';

import styles from './Sidebar.module.scss';

export default function Sidebar({ open, closeSidebar }: { open: boolean; closeSidebar: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.sidebar}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ ease: 'easeOut', duration: 0.4 }}
        >
          <div className={styles.content}>
            <div className={styles.files}>
              <AddFile />
              <hr />
              <FilesList closeSidebar={closeSidebar} />
            </div>
            <ToggleTheme />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
