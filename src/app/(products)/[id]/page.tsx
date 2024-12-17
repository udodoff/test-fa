'use client';

import { useProduct } from '@/shared/api/ProductService/hooks/useProduct';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import PlaceholderImage from '@/assets/images/placeholder.png';
import styles from './page.module.css';
import Text from '@/shared/ui/Text';

const Product = () => {
  const { id = 0 } = useParams();
  const { data: product } = useProduct({ id: +id });

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <Image
          alt={product?.name || ''}
          src={product?.imageUrl || PlaceholderImage}
          className={styles.image}
          width={300}
          height={200}
        />
        <div className={styles.mainInfo}>
          <Text variant='24'>
            {product?.name} {`(${product?.partNumber})`}
          </Text>
          <div className={styles.priceWrapper}>
            <Text>Price:</Text>

            {product?.discountedPrice ? (
              <div className={styles.prices}>
                <Text as='s'>{product?.price}</Text>
                <Text>{product?.discountedPrice}</Text>
              </div>
            ) : (
              <Text>{product?.price}</Text>
            )}
          </div>
          <Text>{product?.description}</Text>
        </div>
      </div>
    </div>
  );
};

export default Product;
