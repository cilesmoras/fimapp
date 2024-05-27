import { useQuery } from "@tanstack/react-query";
import handleApiError from "@utils/handleApiError";
import axios, { AxiosError } from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/ors-accounts`;
const QUERY_KEY = "obligation-accounts";

export function useFetchObligationAccounts(
  obligationRequestId: number | undefined
) {
  return useQuery({
    queryKey: [QUERY_KEY, "obligation-request-id", obligationRequestId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${API_URL}/obligation-request/${obligationRequestId}`
        );
        return response.data;
      } catch (err) {
        throw new Error(handleApiError(err as AxiosError));
      }
    },
  });
}
