/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

export const useFetchData = <TQueryData = any[], TError = Error>(
  queryKey: QueryKey,
  queryFns: Array<() => Promise<any>>, 
  options?: UseQueryOptions<TQueryData, TError>
) => {
  return useQuery<TQueryData, TError>({
    queryKey,
    queryFn: async () => {
      const results = await Promise.all(queryFns.map(async (fn) => {
        const response = await fn();
        return response?.data?.results; 
      }));
      return (queryFns.length === 1 ? results.flat() : results) as TQueryData;
    },
    ...options,
  });
};

export const useRequestData = <TData = any, TError = Error, TVariables = any>(
  mutationFn: (data: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables> 
) => {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
  });
};
