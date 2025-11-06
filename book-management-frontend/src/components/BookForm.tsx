import React, { useState } from "react";
import { useBooks } from "../hooks/useBooks";

export default function BookForm({
  book,
  onCreated,
  onUpdated,
  onClose,
}: {
  book?: any;
  onCreated?: () => void;
  onUpdated?: () => void;
  onClose?: () => void;
}) {
  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [price, setPrice] = useState(book?.price ?? 0);
  const [stock, setStock] = useState(book?.stock ?? 0);
  const [bookCategoryId, setBookCategoryId] = useState(
    book?.bookCategoryId ?? null
  );

  const { createBook, updateBook } = useBooks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <label>
        Title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Author:
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Stock:
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </label>
      <label>
        Category ID:
        <input
          type="number"
          value={bookCategoryId ?? ""}
          onChange={(e) => setBookCategoryId(Number(e.target.value))}
          required
        />
      </label>

      <div style={{ marginTop: 12 }}>
        <button type="submit">{book ? "Update" : "Create"}</button>
        <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
