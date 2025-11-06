import { useBorrow } from "../hooks/useBorrow";
import { useBooks } from "../hooks/useBooks";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const BorrowPage = () => {
  const { booksQuery } = useBooks();
  const { borrowBook, returnBook } = useBorrow();
  const { user, initializeFromStorage } = useAuthStore();
  const books = booksQuery.data || [];
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 6000);
  };

  const handleBorrow = (bookId: number) => {
    if (!user) {
      showNotification("Please log in to borrow a book.");
      return;
    }
    borrowBook.mutate(
      { userId: user.id, bookId },
      {
        onSuccess: () => showNotification("Book borrowed successfully!"),
        onError: () =>
          showNotification(
            "Already borrowed this book and has not returned it."
          ),
      }
    );
  };

  const handleReturn = (bookId: number) => {
    if (!user) {
      showNotification("Please log in to return a book.");
      return;
    }
    returnBook.mutate(
      { userId: user.id, bookId },
      {
        onSuccess: () => showNotification("Book returned successfully!"),
        onError: () =>
          showNotification("No borrow record found for this book."),
      }
    );
  };

  const sortedBooks = [...books].sort((a, b) => a.id - b.id);

  const containerStyle = {
    background: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    width: "100%",
    maxWidth: "900px",
    margin: "30px auto",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const headingStyle = {
    textAlign: "center" as const,
    marginBottom: "20px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse" as const,
    tableLayout: "fixed" as const,
  };

  const thStyle = {
    borderBottom: "2px solid #ccc",
    padding: "10px",
    textAlign: "center" as const,
    width: "33.3%",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #eee",
    textAlign: "center" as const,
    width: "33.3%",
  };

  const buttonStyle = {
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginRight: "8px",
    color: "white",
    fontWeight: "bold" as const,
  };

  const notificationStyle = {
    backgroundColor: "#007bff",
    color: "white",
    textAlign: "center" as const,
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "16px",
    transition: "opacity 0.3s ease",
    opacity: notification ? 1 : 0,
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Borrow / Return</h2>
      {notification && <div style={notificationStyle}>{notification}</div>}
      {user ? (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          Logged in as: <strong>{user.name}</strong>
        </p>
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>
          You are not logged in.
        </p>
      )}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((b: any) => (
            <tr key={b.id}>
              <td style={tdStyle}>{b.title}</td>
              <td style={tdStyle}>
                {b.stock === 0 ? (
                  <strong style={{ color: "red" }}>Out of stock</strong>
                ) : (
                  b.stock
                )}
              </td>
              <td style={tdStyle}>
                <button
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#007bff",
                  }}
                  disabled={b.stock === 0}
                  onClick={() => handleBorrow(b.id)}
                >
                  Borrow
                </button>
                <button
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#28a745",
                  }}
                  onClick={() => handleReturn(b.id)}
                >
                  Return
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowPage;
