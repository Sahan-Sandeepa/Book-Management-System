import { useQuery } from "@tanstack/react-query";
import { api as endpoints } from "../api/endpoints";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await endpoints.categories.list();
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30, //Garbage Collection Time
  });
}
