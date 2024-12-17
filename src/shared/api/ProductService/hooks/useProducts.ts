import { useQuery } from '@tanstack/react-query';

import { ProductService } from '..';
import { ProductsParams } from '../model';

export const KEY_GET_PRODUCTS = 'getProducts';

export const useProducts = (params: ProductsParams) =>
  useQuery({
    queryKey: [KEY_GET_PRODUCTS, params],
    queryFn: () => ProductService.getProducts({ ...params }),
  });
