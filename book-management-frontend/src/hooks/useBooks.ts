import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api as endpoints } from "../api/endpoints";
import { Book } from "../types";

export function useBooks() {
  const qc = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await endpoints.books.list();
      return res.data as Book[];
    },
  });

  const createBook = useMutation({
    mutationFn: async (payload: Partial<Book>) => {
      const res = await endpoints.books.create(payload);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
    onError: (error: any) => {
      console.error("Create book failed:", error);
    },
  });

  const updateBook = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<Book>;
    }) => {
      const res = await endpoints.books.update(id, payload);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });

  const deleteBook = useMutation({
    mutationFn: async ({ id, force }: { id: number; force?: boolean }) => {
      const res = await endpoints.books.delete({ id, force });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });

  return {
    booksQuery,
    createBook,
    updateBook,
    deleteBook,
  };
}
