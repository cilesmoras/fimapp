import { ObligationRequest } from "@customTypes/ObligationRequest.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import handleApiError from "@utils/handleApiError";
import axios, { AxiosError } from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/ors`;
const QUERY_KEY = "obligation_requests";

export function useFetchObligationRequests() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  });
}

export function useInsertObligationRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ObligationRequest) => {
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