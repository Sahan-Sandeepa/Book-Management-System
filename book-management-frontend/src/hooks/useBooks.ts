import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api as endpoints } from "../api/endpoints";
import { Book } from "../types";

export function useBooks() {
  const qc = useQueryClient();

  // Fetch all books
  const booksQuery = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await endpoints.books.list();
      return res.data as Book[];
    },
  });

  // Create a book
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

  // Update a book
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

  // Delete a book
  const deleteBook = useMutation({
    mutationFn: async (id: number) => {
      const res = await endpoints.books.delete(id);
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
