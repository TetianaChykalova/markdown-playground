import { motion, AnimatePresence } from 'framer-motion';
import styles from './Sidebar.module.scss';

export default function Sidebar({ open }: { open: boolean }) {

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
          SIDEBAR
        </motion.div>
      )}
    </AnimatePresence>
  )
}