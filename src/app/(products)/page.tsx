'use client';

import { useProducts } from '@/shared/api/ProductService/hooks/useProducts';
import styles from './page.module.css';
import { CreateProductDefaultValues, Order, UpdateProductDefaultValues } from '@/shared/constants';
import ProductCard from '@/components/ProductCard';
import { useDeleteProduct } from '@/shared/api/ProductService/hooks/useDeleteProduct';
import { useModifyProduct } from '@/shared/api/ProductService/hooks/useModifyProduct';
import { useState } from 'react';
import Pagination from '@/components/Pagination';
import Modal from '@/components/Modal';
import Button from '@/shared/ui/Button';
import { useForm, Controller } from 'react-hook-form';
import { CreateProductBody, UpdateProductBody } from '@/shared/api/ProductService/model';
import Input from '@/shared/ui/Input';
import { convertToBase64 } from '@/shared/utils/file';
import useDebounce from '@/shared/utils/useDebounce';
import { useCreateProduct } from '@/shared/api/ProductService/hooks/useCreateProduct';

export default function Home() {
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [file, setFile] = useState<string>();
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 300);

  const { control, handleSubmit: handleSubmitModify } = useForm<UpdateProductBody>({
    defaultValues: UpdateProductDefaultValues,
  });

  const { control: createControl, handleSubmit: handleSubmitCreate } = useForm<CreateProductBody>({
    defaultValues: CreateProductDefaultValues,
  });

  const { data: products, refetch: refetchProducts } = useProducts({
    search: debouncedSearch,
    order: Order.ASC,
    page: currentPage,
    take: 10,
  });

  const { mutateAsync: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      refetchProducts();
    },
  });

  const { mutateAsync: modifyProduct } = useModifyProduct({
    onSuccess: () => {
      refetchProducts();
    },
  });

  const { mutateAsync: createProduct } = useCreateProduct({
    onSuccess: () => {
      refetchProducts();
    },
  });

  const handleModifyModalOpen = (id: number) => {
    setSelectedProduct(id);
    setOpenModifyModal(true);
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const base64 = await convertToBase64(file);
    setFile(base64);
  };

  const handleCreateProduct = (data: CreateProductBody) => {
    if (!file) {
      createProduct(data);
      return;
    }
    const base64 = file?.split(',')[1];
    createProduct({ ...data, image: base64 });
    setOpenCreateModal(false);
  };

  const handleModifyProduct = (data: UpdateProductBody) => {
    if (selectedProduct === null) return;
    if (!file) {
      modifyProduct({ ...data, id: selectedProduct });
      return;
    }
    const base64 = file?.split(',')[1];
    modifyProduct({ ...data, image: base64, id: selectedProduct });
    setSelectedProduct(null);
    setOpenModifyModal(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.controls}>
          <Input
            value={search}
            onChange={(value) => setSearch(value)}
            placeholder='Search'
            className={styles.search}
          />
          <Button onClick={() => setOpenCreateModal(true)} className={styles.add}>
            Add product
          </Button>
        </div>
        <div className={styles.page}>
          {products?.data.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onDelete={() => deleteProduct({ id: product.id })}
              handleOpenModal={(id) => handleModifyModalOpen(id)}
            />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={products?.meta.pageCount || 1}
        onPageChange={setCurrentPage}
      />
      <Modal open={openModifyModal} setOpen={setOpenModifyModal} title={'Modify product'}>
        <div className={styles.modalContent}>
          <Controller
            control={control}
            name='name'
            render={({ field }) => <Input {...field} placeholder='Name' />}
          />
          <Controller
            control={control}
            name='description'
            render={({ field }) => <Input {...field} placeholder='Description' />}
          />
          <Controller
            control={control}
            name='price'
            render={({ field }) => <Input {...field} placeholder='Price' />}
          />
          <Controller
            control={control}
            name='discountedPrice'
            render={({ field }) => <Input {...field} placeholder='Discounted price' />}
          />

          <input type='file' onChange={uploadFile} />
        </div>
        <Button onClick={handleSubmitModify(handleModifyProduct)} className={styles.modifyButton}>
          Modify
        </Button>
      </Modal>
      <Modal open={openCreateModal} setOpen={setOpenCreateModal} title={'Add product'}>
        <div className={styles.modalContent}>
          <Controller
            control={createControl}
            name='name'
            render={({ field }) => <Input {...field} placeholder='Name' />}
          />
          <Controller
            control={createControl}
            name='description'
            render={({ field }) => <Input {...field} placeholder='Description' />}
          />
          <Controller
            control={createControl}
            name='price'
            render={({ field }) => <Input {...field} placeholder='Price' />}
          />
          <Controller
            control={createControl}
            name='discountedPrice'
            render={({ field }) => <Input {...field} placeholder='Discounted price' />}
          />

          <input type='file' onChange={uploadFile} />
        </div>
        <Button onClick={handleSubmitCreate(handleCreateProduct)} className={styles.modifyButton}>
          Create
        </Button>
      </Modal>
    </div>
  );
}
