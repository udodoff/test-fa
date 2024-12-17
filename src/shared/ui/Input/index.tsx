import { FC } from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

type InputProps = {
  value?: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const Input: FC<InputProps> = ({ value, onChange, placeholder, className }) => {
  return (
    <input
      className={clsx(styles.root, className)}
      type='text'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default Input;
