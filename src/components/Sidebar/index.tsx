import { AnimatePresence, motion } from 'framer-motion';

import AddFile from './components/AddFile';
import FilesList from './components/FilesList';
import ToggleTheme from './components/ToggleTheme';

import styles from './Sidebar.module.scss';
import { useMediaQuery } from 'usehooks-ts';
import { TABLET_MEDIA_QUERY } from '@/utils/constants';
import Actions from '../Actions';

export default function Sidebar({ open, closeSidebar }: { open: boolean; closeSidebar: () => void }) {
  const isTablet = useMediaQuery(TABLET_MEDIA_QUERY);

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
              {isTablet && (
                <>
                  <Actions direction='column' showSave={false} />
                  <hr />
                </>
              )}
              <FilesList closeSidebar={closeSidebar} />
            </div>
            <div>
              {/* remove all files */}
              <ToggleTheme />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
