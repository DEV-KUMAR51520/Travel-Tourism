import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../api";


export const useMyBookings = () =>
  useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => (await api.get("/bookings/me")).data,
  });

export const useCreateBooking = () =>
  useMutation({
    mutationFn: async (payload: any) => (await api.post("/bookings", payload)).data,
  });

export const useCancelBooking = () =>
  useMutation({
    mutationFn: async (id: number) => (await api.delete(`/bookings/${id}`)).data,
  });

export const useAdminBookings = () =>
  useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => (await api.get("/bookings")).data,
  });

export const useUpdateBookingStatus = () =>
  useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) =>
      (await api.put(`/bookings/${id}/status`, { status })).data,
  });
