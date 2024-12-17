import { useMutation } from '@tanstack/react-query';

import { ProductService } from '..';
import { IMutationOptions } from '../../model';
import { CreateProductBody, Product } from '../model';

export const KEY_CREATE_PRODUCT = 'createProduct';

export const useCreateProduct = (options?: IMutationOptions<Product, CreateProductBody>) =>
  useMutation({
    mutationKey: [KEY_CREATE_PRODUCT],
    mutationFn: (data) => ProductService.createProduct(data),
    ...options,
  });
