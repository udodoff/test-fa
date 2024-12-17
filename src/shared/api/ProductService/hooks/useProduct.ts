import { useQuery } from '@tanstack/react-query';

import { ProductService } from '..';
import { ProductParams } from '../model';

export const KEY_GET_PRODUCT = 'getProduct';

export const useProduct = (params: ProductParams) =>
  useQuery({
    queryKey: [KEY_GET_PRODUCT, params],
    queryFn: () => ProductService.getProduct(params.id),
  });
