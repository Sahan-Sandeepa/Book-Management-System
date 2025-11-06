import { useBorrow } from "../hooks/useBorrow";
import { useBooks } from "../hooks/useBooks";
import { useState } from "react";

export default function BorrowPage() {
  const { booksQuery } = useBooks();
  const { borrowBook, returnBook } = useBorrow();
  const books = booksQuery.data || [];

  // Demo users
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];

  const [selectedUser, setSelectedUser] = useState<number | null>(users[0].id);

  const handleBorrow = (bookId: number) => {
    if (!selectedUser) return alert("Select user");
    borrowBook.mutate({ userId: selectedUser, bookId });
  };

  const handleReturn = (bookId: number) => {
    if (!selectedUser) return alert("Select user");
    returnBook.mutate({ userId: selectedUser, bookId });
  };

  return (
    <div>
      <h2>Borrow / Return</h2>
      <div>
        <label>User: </label>
        <select
          value={selectedUser ?? ""}
          onChange={(e) => setSelectedUser(Number(e.target.value))}
        >
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      <table style={{ marginTop: 12, width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b: any) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.stock === 0 ? <strong>Out of stock</strong> : b.stock}</td>
              <td>
                <button
                  disabled={b.stock === 0}
                  onClick={() => handleBorrow(b.id)}
                >
                  Borrow
                </button>
                <button
                  onClick={() => handleReturn(b.id)}
                  style={{ marginLeft: 8 }}
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
}
