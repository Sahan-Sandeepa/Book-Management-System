import React, { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import { useCategories } from "../hooks/useCategories";
import { Category } from "../types";

const BookForm = ({
  book,
  onCreated,
  onUpdated,
  onClose,
}: {
  book?: any;
  onCreated?: () => void;
  onUpdated?: () => void;
  onClose?: () => void;
}) => {
  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [price, setPrice] = useState(book?.price ?? 0);
  const [stock, setStock] = useState(book?.stock ?? 0);
  const [error, setError] = useState("");
  const [bookCategoryId, setBookCategoryId] = useState<number | null>(
    book?.bookCategoryId ?? null
  );
  const { createBook, updateBook } = useBooks();
  const { data: categories = [] } = useCategories();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      setError("Title and author are required");
      return;
    }
    if (isNaN(Number(price)) || isNaN(Number(stock))) {
      setError("Price and stock must be valid numbers");
      return;
    }

    const payload = {
      title,
      author,
      price: Number(price),
      stock: Number(stock),
      bookCategoryId,
    };

    try {
      if (book) {
        await updateBook.mutateAsync({ id: book.id, payload });
        onUpdated?.();
      } else {
        await createBook.mutateAsync(payload);
        onCreated?.();
      }
      onClose?.();
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Submission failed");
    }
  };

  const containerStyle = {
    background: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    width: "100%",
    maxWidth: "400px",
    margin: "16px auto",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "10px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    marginBottom: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "12px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <form onSubmit={handleSubmit} style={containerStyle}>
      <label style={labelStyle}>
        Title:
        <input
          style={inputStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label style={labelStyle}>
        Author:
        <input
          style={inputStyle}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </label>

      <label style={labelStyle}>
        Price:
        <input
          style={inputStyle}
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>

      <label style={labelStyle}>
        Stock:
        <input
          style={inputStyle}
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </label>

      <label style={labelStyle}>
        Category:
        <select
          style={inputStyle}
          value={bookCategoryId ?? ""}
          onChange={(e) => setBookCategoryId(Number(e.target.value))}
          required
        >
          <option value="">Select category</option>
          {categories.map((c: Category) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

      <div style={buttonContainerStyle}>
        <button
          type="submit"
          style={{
            ...buttonStyle,
            backgroundColor: "#007bff",
            color: "white",
          }}
        >
          {book ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{
            ...buttonStyle,
            backgroundColor: "#dc3545",
            color: "white",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookForm;
