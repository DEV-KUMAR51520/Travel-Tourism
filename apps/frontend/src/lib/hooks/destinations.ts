// apps/frontend/src/lib/hooks/destinations.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import  api from "../api";


export const useDestinations = () => {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const res = await api.get("/destinations");
      return res.data;
    },
  });
};

export const useDestination = (id?: number | string | null) => {
  return useQuery({
    queryKey: ["destination", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await api.get(`/destinations/${id}`);
      return res.data;
    },
  });
};

export const useCreateDestination = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await api.post("/destinations", payload);
      return res.data;
    },
    onSuccess: () => {
      // invalidate list
      // use queryClient in component or import here and call
    },
  });
};

export const useUpdateDestination = () => {
  return useMutation({
    mutationFn: async ({ id, ...payload }: any) => {
      const res = await api.put(`/destinations/${id}`, payload);
      return res.data;
    },
  });
};

export const useDeleteDestination = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/destinations/${id}`);
      return id;
    },
  });
};
