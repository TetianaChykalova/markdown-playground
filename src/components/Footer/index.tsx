import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>
          basic syntax
        </a>
      </div>
    </footer>
  );
}
