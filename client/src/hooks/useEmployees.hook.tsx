import { EmployeesSchema } from "@pages/employees/Employees.form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import handleApiError from "@utils/handleApiError";
import axios, { AxiosError } from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/employees`;
const QUERY_KEY = "employees";

export function useFetchEmployees() {
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

export function useFetchOneEmployee(employeesId: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY, employeesId],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/${employeesId}`);
        return response.data;
      } catch (err) {
        throw new Error(handleApiError(err as AxiosError));
      }
    },
  });
}

export function useInsertEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EmployeesSchema) => {
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

export function useEditEmployee(id: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EmployeesSchema) => {
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

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      try {
        const response = await axios.delete(`${API_URL}/${id}`);
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
