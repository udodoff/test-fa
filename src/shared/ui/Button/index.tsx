import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import Text from '../Text';

import styles from './Button.module.css';

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ className, children, onClick, disabled }) => {
  return (
    <button className={clsx(styles.root, className)} onClick={onClick} disabled={disabled}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text>{children}</Text>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
