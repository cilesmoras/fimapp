import { ChartOfAccountsFormValues } from "@pages/chart_of_accounts/ChartOfAccounts.form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import handleApiError from "@utils/handleApiError";
import axios, { AxiosError } from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/chart-of-accounts`;
const QUERY_KEY = "chart_of_accounts";

export function useFetchChartOfAccounts() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      try {
        const response = await axios.get(API_URL);
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  });
}

export function useFetchChartOfAccountsByAllotmentClassesId(
  allotmentClassesId: string
) {
  return useQuery({
    queryKey: [QUERY_KEY, allotmentClassesId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${API_URL}/allotment-classes/a/${allotmentClassesId}`
        );
        return response.data;
      } catch (err) {
        throw new Error(handleApiError(err as AxiosError));
      }
    },
  });
}

export function useFetchOneChartOfAccount(id: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  });
}

export function useInsertChartOfAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ChartOfAccountsFormValues) => {
      try {
        const res = await axios.post(API_URL, data);
        return {
          response: res.data,
          allotmentClassesId: data.allotment_classes_id,
        };
      } catch (err) {
        throw new Error(handleApiError(err as AxiosError));
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, data.allotmentClassesId],
      });
    },
  });
}

export function useEditChartOfAccount(id: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ChartOfAccountsFormValues) => {
      try {
        const res = await axios.patch(`${API_URL}/${id}`, data);
        return {
          response: res.data,
          allotment_classes_id: data.allotment_classes_id,
        };
      } catch (err) {
        throw new Error(handleApiError(err as AxiosError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useDeleteChartOfAccount() {
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
