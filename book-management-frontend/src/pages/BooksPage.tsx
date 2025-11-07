import React, { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import { useCategories } from "../hooks/useCategories";
import { useUIStore } from "../store/uiStore";
import BookForm from "../components/BookForm";
import { UIState } from "../types";

const BookRow = ({ book, onEdit, onDelete }: any) => {
  return (
    <tr
      style={{
        borderBottom: "1px solid #ddd",
        textAlign: "center",
        verticalAlign: "middle",
        height: "48px",
      }}
    >
      <td style={{ padding: "8px 12px" }}>{book.title}</td>
      <td style={{ padding: "8px 12px" }}>{book.author}</td>
      <td style={{ padding: "8px 12px" }}>{Number(book.price).toFixed(2)}</td>
      <td style={{ padding: "8px 12px" }}>
        {book.stock === 0 ? (
          <strong style={{ color: "red" }}>Out of stock</strong>
        ) : (
          book.stock
        )}
      </td>
      <td style={{ padding: "8px 12px" }}>{book.bookCategory?.name ?? "-"}</td>
      <td style={{ padding: "8px 12px" }}>
        <button
          onClick={() => onEdit(book)}
          style={{
            marginRight: "8px",
            padding: "6px 12px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(book.id)}
          style={{
            padding: "6px 12px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#dc3545",
            color: "white",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default function BooksPage() {
  const { booksQuery, deleteBook } = useBooks();
  const { data: cats = [], isLoading: catsLoading } = useCategories();

  const selectedCategory = useUIStore((s: UIState) => s.selectedCategory);
  const setSelectedCategory = useUIStore((s: UIState) => s.setSelectedCategory);
  const books = booksQuery.data || [];
  const isLoading = booksQuery.isLoading;

  const [editing, setEditing] = useState<any>(null);
  const [creating, setCreating] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteBook.mutateAsync({ id });

      if (res?.requiresConfirmation) {
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm(res.message);
        if (confirmed) {
          await deleteBook.mutateAsync({ id, force: true });
        }
      } else {
        alert("Book deleted successfully.");
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete book");
    }
  };

  const filteredBooks = selectedCategory
    ? books.filter((b) => b.bookCategory?.id === selectedCategory)
    : books;

  if (isLoading || catsLoading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Books</h2>

      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <label>
            <strong>Filter:</strong>{" "}
            <select
              value={selectedCategory ?? ""}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value ? Number(e.target.value) : null
                )
              }
              style={{
                marginLeft: 8,
                padding: "6px 8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">All</option>
              {cats.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => setCreating(true)}
        >
          + Create Book
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          <tr style={{ textAlign: "center", height: "50px" }}>
            <th style={{ padding: "10px" }}>Title</th>
            <th style={{ padding: "10px" }}>Author</th>
            <th style={{ padding: "10px" }}>Price</th>
            <th style={{ padding: "10px" }}>Stock</th>
            <th style={{ padding: "10px" }}>Category</th>
            <th style={{ padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((b: any) => (
              <BookRow
                key={b.id}
                book={b}
                onEdit={setEditing}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#666",
                }}
              >
                No books found
              </td>
            </tr>
          )}
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
