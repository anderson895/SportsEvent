/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

// Custom hook for fetching data
export const useFetchData = <TQueryData = any, TError = Error>(
  queryKey: QueryKey,
  queryFn: () => Promise<TQueryData>, 
  options?: UseQueryOptions<TQueryData, TError>
) => {
  return useQuery<TQueryData, TError>({
    queryKey,
    queryFn,
    ...options,
  });
};

// Custom hook for mutations (e.g., POST, PUT, DELETE)
export const useRequestData = <TData = any, TError = Error, TVariables = any>(
  mutationFn: (data: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables> 
) => {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
  });
};
