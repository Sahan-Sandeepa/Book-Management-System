import apiClient from "../api/axiosClient";

export const api = {
  books: {
    list: (categoryId?: number) =>
      apiClient.get("/books", {
        params: categoryId ? { categoryId } : {},
      }),
    get: (id: number) => apiClient.get(`/books/${id}`),
    create: (payload: any) => apiClient.post("/books", payload),
    update: (id: number, payload: any) =>
      apiClient.put(`/books/${id}`, payload),
    delete: (id: number) => apiClient.delete(`/books/${id}`),
  },

  categories: {
    list: () => apiClient.get("/categories"),
  },

  borrow: {
    borrow: (payload: { userId: number; bookId: number }) =>
      apiClient.post("/borrow", payload),
    return: (payload: { userId: number; bookId: number }) =>
      apiClient.post("/borrow/return", payload),
  },
};
