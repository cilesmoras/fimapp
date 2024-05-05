import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const QUERY_KEY = "allotment_classes";

export function useFetchAllotmentClasses() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/allotment-classes`);
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  });
}
