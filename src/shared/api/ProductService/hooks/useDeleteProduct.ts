import { useMutation } from '@tanstack/react-query';

import { ProductService } from '..';
import { IMutationOptions } from '../../model';
import { DeleteProductBody } from '../model';

export const KEY_DELETE_PRODUCT = 'deleteProduct';

export const useDeleteProduct = (options?: IMutationOptions<void, DeleteProductBody>) =>
  useMutation({
    mutationKey: [KEY_DELETE_PRODUCT],
    mutationFn: (data) => ProductService.deleteProduct(data.id),
    ...options,
  });
