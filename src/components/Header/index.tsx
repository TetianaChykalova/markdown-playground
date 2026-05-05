import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import Sidebar from '@/components/Sidebar';

import styles from './Header.module.scss';
import Actions from '@/components/Actions';
import { useMediaQuery } from 'usehooks-ts';
import { TABLET_MEDIA_QUERY } from '@/utils/constants';

export default function Header() {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isTablet = useMediaQuery(TABLET_MEDIA_QUERY);

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
          <Actions {...(isTablet && { showRename: false, showDownload: false, showDelete: false })} />
        </div>
        <p className={styles.title}>Markdown Playground</p>
      </header>
      <div ref={sidebarRef}>
        <Sidebar open={open} closeSidebar={() => setOpen(false)} />
      </div>
    </>
  );
}
