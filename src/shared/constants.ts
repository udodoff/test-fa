import { ElementType } from 'react';
import { CreateProductBody, UpdateProductBody } from './api/ProductService/model';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

type EmtyObject = {
  [key: string]: never;
};

export type PolymorphicProps<T extends ElementType, E extends object = EmtyObject> = {
  as?: T;
} & E &
  Omit<React.ComponentPropsWithoutRef<T>, keyof E | 'as'>;

export const UpdateProductDefaultValues: UpdateProductBody = {
  id: 0,
  name: undefined,
  description: undefined,
  price: undefined,
  discountedPrice: undefined,
  image: undefined,
};

export const CreateProductDefaultValues: CreateProductBody = {
  name: '',
  description: '',
  price: 0,
  discountedPrice: 0,
  image: undefined,
};
