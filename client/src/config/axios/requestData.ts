/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  QueryKey,
} from "@tanstack/react-query";

export const useFetchData = <
  TQueryData = any[],
  TError = Error
>(
  queryKey: QueryKey,
  queryFns: Array<() => Promise<any>>,
  options?: Omit<UseQueryOptions<TQueryData, TError>, "queryKey" | "queryFn"> & {
    interval?: number; // Custom interval option
  }
) => {
  const { interval, ...restOptions } = options || {}; // Extract `interval` from options

  return useQuery<TQueryData, TError>({
    queryKey,
    queryFn: async () => {
      const results = await Promise.all(
        queryFns.map(async (fn) => {
          const response = await fn();
          return response?.data?.results;
        })
      );
      return (queryFns.length === 1 ? results.flat() : results) as TQueryData;
    },
    refetchInterval: interval, // Use interval for periodic refetching
    ...restOptions,
  });
};

export const useRequestData = <
  TData = any,
  TError = Error,
  TVariables = any
>(
  mutationFn: (data: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables>
) => {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
  });
};
