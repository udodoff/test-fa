import Text from '@/shared/ui/Text';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <Text as='h1' variant='24'>
        Products
      </Text>
      <Text as='p' variant='20'>
        Admin
      </Text>
    </div>
  );
};

export default Header;
