import { Pap } from "@customTypes/pap.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import handleApiError from "@utils/handleApiError";
import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const QUERY_KEY = "pap";

export function useFetchPAP() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/mfo-pap`);
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  });
}

export function useFetchOnePAP(id: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/mfo-pap/${id}`);
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  });
}

export function useAddPAP() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Pap) => {
      try {
        const res = await axios.post(`${API_URL}/mfo-pap`, data);
        return res.data;
      } catch (err) {
        throw new Error(handleApiError(err as AxiosError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useEditPAP(id: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Pap) => {
      try {
        const response = await axios.patch(`${API_URL}/mfo-pap/${id}`, data);
        return response;
      } catch (err) {
        throw new Error(handleApiError(err as AxiosError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useDeletePAP() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`${API_URL}/mfo-pap/${id}`);
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
