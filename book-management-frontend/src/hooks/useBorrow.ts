import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api as endpoints } from "../api/endpoints";

export function useBorrow() {
  const qc = useQueryClient();

  const borrowBook = useMutation({
    mutationFn: async (payload: { userId: number; bookId: number }) => {
      const res = await endpoints.borrow.borrow(payload);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });

  const returnBook = useMutation({
    mutationFn: async (payload: { userId: number; bookId: number }) => {
      const res = await endpoints.borrow.return(payload);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });

  return { borrowBook, returnBook };
}
