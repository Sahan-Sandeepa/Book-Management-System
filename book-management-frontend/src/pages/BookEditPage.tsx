import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import BookForm from "../components/BookForm";

export default function BookEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { booksQuery } = useBooks();
  const bookId = Number(id);

  const book = booksQuery.data?.find((b) => b.id === bookId);

  if (booksQuery.isLoading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Book</h2>
      <BookForm
        book={book}
        onUpdated={() => {
          alert("Book updated!");
          navigate("/");
        }}
      />
    </div>
  );
}
