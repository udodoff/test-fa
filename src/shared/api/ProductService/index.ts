import { makeApiRequest } from '..';
import {
  CreateProductBody,
  IGetProducts,
  Product,
  ProductsParams,
  UpdateProductBody,
} from './model';

export const ProductService = {
  async getProducts(data: ProductsParams) {
    const queryString = Object.entries(data)
      .map(([key, value]) => (value ? `${key}=${value}` : ''))
      .join('&');

    return await makeApiRequest<IGetProducts>(`/product?${queryString}`, { method: 'GET' }, true);
  },

  async getProduct(id: number) {
    const res = await makeApiRequest<Product>(`/product/${id}`, { method: 'GET' });
    console.log(res);
    return res;
  },

  async createProduct(data: CreateProductBody) {
    return await makeApiRequest<Product>('/product', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateProduct(data: UpdateProductBody) {
    return await makeApiRequest<Product>(`/product/update`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async deleteProduct(id: number) {
    return await makeApiRequest<void>(`/product/${id}`, { method: 'DELETE' });
  },
};
