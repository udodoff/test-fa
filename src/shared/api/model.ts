import { UseMutationOptions } from '@tanstack/react-query';

export type IBasicResponseError = {
  error: string;
};

export type IMutationOptions<T, D = void> = Omit<
  UseMutationOptions<T, IBasicResponseError, D>,
  'mutationKey' | 'mutationFn'
>;
