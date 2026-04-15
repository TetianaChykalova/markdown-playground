import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import Sidebar from '../Sidebar';
import FileName from './components/FileName';

import styles from './Header.module.scss';

export default function Header() {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuClickHandler = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickOutsideSidebar = sidebarRef.current && !sidebarRef.current.contains(target);
      const clickOutsideMenu = menuRef.current && !menuRef.current.contains(target);

      if (open && clickOutsideSidebar && clickOutsideMenu) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

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
            ref={menuRef}
          >
            <div className={styles.line} />
          </div>
          <FileName />
        </div>
        <p className={styles.title}>Markdown Playground</p>
      </header>
      <div ref={sidebarRef}>
        <Sidebar open={open} closeSidebar={() => setOpen(false)} />
      </div>
    </>
  );
}
