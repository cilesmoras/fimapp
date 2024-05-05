import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import handleApiError from "@utils/handleApiError";
import axios, { AxiosError } from "axios";

type Budget = {
  mfo_paps_id: number;
  chart_of_accounts_id: number;
  amount: number;
};

const API_URL = `${import.meta.env.VITE_API_URL}/budget`;
const QUERY_KEY = "budget";

export function useFetchBudget() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      try {
        const response = await axios.get(API_URL);
        return response.data;
      } catch (err) {
        handleApiError(err as AxiosError);
      }
    },
  });
}

export function useFetchOneBudget(budgetId: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY, budgetId],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/${budgetId}`);
        return response.data;
      } catch (err) {
        throw new Error(handleApiError(err as AxiosError));
      }
    },
  });
}

export function useInsertBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Budget) => {
      try {
        const res = await axios.post(API_URL, data);
        return {
          response: res.data,
        };
      } catch (err) {
        throw new Error(handleApiError(err as AxiosError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
}

export function useUpdateBudget(id: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Budget) => {
      try {
        const res = await axios.patch(`${API_URL}/${id}`, data);
        return {
          response: res.data,
        };
      } catch (err) {
        throw new Error(handleApiError(err as AxiosError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
}
