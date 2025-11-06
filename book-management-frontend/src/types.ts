export type Category = {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
  bookCategoryId?: number | null;
  bookCategory?: Category | null;
  createdAt?: string;
  updatedAt?: string;
};

export type User = {
  id: number;
  name: string;
  email?: string;
};

export type UIState = {
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  searchText: string;
  setSearchText: (s: string) => void;
};
