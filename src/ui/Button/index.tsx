import styles from './Button.module.scss';

type ButtonType = 'text' | 'action' | 'danger' | 'danger-action' | 'list-item';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonType: ButtonType;
}

export default function Button({ children, buttonType, ...props }: ButtonProps) {
  return (
    <button data-type={buttonType} className={styles.button} {...props}>
      {children}
    </button>
  );
}
