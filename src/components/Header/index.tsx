import styles from './Header.module.scss';

export default function Header() {

  return (
    <header className={styles.wrapper}>
      <div className={styles.menu}>
        <div className={styles.line} />
      </div>
      <p className={styles.title}>Markdown Playground</p>
    </header>
  )
}