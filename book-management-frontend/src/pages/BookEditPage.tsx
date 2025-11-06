import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import BookForm from "../components/BookForm";
import { Empty, Loader } from "../components/Utility";

export default function BookEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { booksQuery } = useBooks();
  const bookId = Number(id);

  const book = booksQuery.data?.find((b) => b.id === bookId);

  if (booksQuery.isLoading) return <Loader />;
  if (!book) return <Empty message="No books found." />;

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
