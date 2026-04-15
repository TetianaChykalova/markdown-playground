import clsx from 'clsx';
import { useState } from 'react';

import Sidebar from '../Sidebar';
import FileName from './components/FileName';

import styles from './Header.module.scss';

export default function Header() {
  const [open, setOpen] = useState(false);

  const menuClickHandler = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <header className={styles.wrapper}>
        <div className={styles.interactive}>
          <div
            className={clsx(styles.menu, {
              [styles.menuOpen]: open,
            })}
            role='button'
            onClick={menuClickHandler}
          >
            <div className={styles.line} />
          </div>
          <FileName />
        </div>
        <p className={styles.title}>Markdown Playground</p>
      </header>
      <Sidebar open={open} closeSidebar={() => setOpen(false)} />
    </>
  );
}
