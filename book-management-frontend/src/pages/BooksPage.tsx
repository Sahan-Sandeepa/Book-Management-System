import React, { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import { useCategories } from "../hooks/useCategories";
import { useUIStore } from "../store/uiStore";
import BookForm from "../components/BookForm";
import { UIState } from "../types";

function BookRow({ book, onEdit, onDelete }: any) {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{Number(book.price).toFixed(2)}</td>
      <td>{book.stock === 0 ? <strong>Out of stock</strong> : book.stock}</td>
      <td>{book.bookCategory?.name ?? "-"}</td>
      <td>
        <button onClick={() => onEdit(book)}>Edit</button>
        <button onClick={() => onDelete(book.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default function BooksPage() {
  const { booksQuery, deleteBook } = useBooks();
  const { data: cats = [], isLoading: catsLoading } = useCategories();

  const selectedCategory = useUIStore((s: UIState) => s.selectedCategory);
  const setSelectedCategory = useUIStore((s: UIState) => s.setSelectedCategory);
  const books = booksQuery.data || [];
  const isLoading = booksQuery.isLoading;

  // Local state for modals/forms
  const [editing, setEditing] = useState<any>(null);
  const [creating, setCreating] = useState(false);

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Delete this book?")) return;
    deleteBook.mutate(id);
  };

  // filter books by category in the frontend
  const filteredBooks = selectedCategory
    ? books.filter((b) => b.bookCategory?.id === selectedCategory)
    : books;

  if (isLoading || catsLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Books</h2>

      <div style={{ marginBottom: 12 }}>
        <label>
          Filter:
          <select
            value={selectedCategory ?? ""}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value ? Number(e.target.value) : null
              )
            }
            style={{ marginLeft: 8 }}
          >
            <option value="">All</option>
            {cats.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <button style={{ marginLeft: 12 }} onClick={() => setCreating(true)}>
          Create Book
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((b: any) => (
            <BookRow
              key={b.id}
              book={b}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      {creating && (
        <BookForm
          onClose={() => setCreating(false)}
          onCreated={() => setCreating(false)}
        />
      )}

      {editing && (
        <BookForm
          book={editing}
          onClose={() => setEditing(null)}
          onUpdated={() => setEditing(null)}
        />
      )}
    </div>
  );
}
