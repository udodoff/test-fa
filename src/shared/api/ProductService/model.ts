import { Order } from '@/shared/constants';

export type ProductsParams = {
  search?: string;
  order?: Order;
  page?: number;
  take?: number;
};

export type ProductParams = {
  id: number;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  partNumber: string;
  imageUrl?: string;
};

export type IGetProducts = {
  data: Product[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

export type DeleteProductBody = {
  id: number;
};

export type CreateProductBody = Omit<Product, 'id' | 'partNumber' | 'imageUrl'> & {
  image?: string;
};

export type UpdateProductBody = Partial<CreateProductBody> & {
  id: number;
};
