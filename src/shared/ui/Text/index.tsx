import clsx from 'clsx';
import { ElementType } from 'react';

import styles from './Text.module.css';
import { PolymorphicProps } from '@/shared/constants';

export interface TextProps {
  variant?: '34' | '28' | '24' | '20' | '19' | '17' | '16' | '15' | '13' | '12' | '10';
  fontWeight?: '400' | '500' | '600' | '700';
}

const Text = <T extends ElementType = 'p'>({
  variant = '16',
  className,
  fontWeight = '400',
  as,
  ...props
}: PolymorphicProps<T, TextProps>) => {
  const Tag = as ?? 'p';
  return (
    <Tag
      className={clsx(className, styles.root, styles['f' + variant], styles['w' + fontWeight])}
      {...props}
    />
  );
};

export default Text;
