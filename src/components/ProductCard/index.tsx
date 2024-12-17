'use client';

import { Product } from '@/shared/api/ProductService/model';
import Image from 'next/image';
import { FC } from 'react';
import PlaceholderImage from '@/assets/images/placeholder.png';
import Text from '@/shared/ui/Text';
import Button from '@/shared/ui/Button';
import styles from './ProductCard.module.css';
import { useRouter } from 'next/navigation';

type ProductCardProps = Product & {
  onDelete: () => void;
  handleOpenModal: (id: number) => void;
};

const ProductCard: FC<ProductCardProps> = ({
  name,
  description,
  price,
  discountedPrice,
  partNumber,
  id,
  imageUrl,
  onDelete,
  handleOpenModal,
}) => {
  const router = useRouter();
  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleOpenModal(id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div onClick={() => router.push(`/${id}`)} className={styles.root}>
      <Image
        className={styles.image}
        alt={name}
        src={imageUrl || PlaceholderImage}
        width={300}
        height={200}
      />

      <div className={styles.mainInfo}>
        <Text variant='24'>
          {name} {`(${partNumber})`}
        </Text>
        <div className={styles.priceWrapper}>
          <Text>Price:</Text>

          {discountedPrice ? (
            <div className={styles.prices}>
              <Text as='s'>{price}</Text>
              <Text>{discountedPrice}</Text>
            </div>
          ) : (
            <Text>{price}</Text>
          )}
        </div>
        <Text>{description}</Text>
      </div>

      <div className={styles.buttons}>
        <Button className={styles.updateButton} onClick={handleUpdate}>
          Update
        </Button>
        <Button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
