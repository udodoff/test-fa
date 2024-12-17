import { useMutation } from '@tanstack/react-query';

import { ProductService } from '..';
import { IMutationOptions } from '../../model';
import { Product, UpdateProductBody } from '../model';

export const KEY_MODIFY_PRODUCT = 'modifyProduct';

export const useModifyProduct = (options?: IMutationOptions<Product, UpdateProductBody>) =>
  useMutation({
    mutationKey: [KEY_MODIFY_PRODUCT],
    mutationFn: (data) => ProductService.updateProduct(data),
    ...options,
  });
