import { Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import BooksPage from "./pages/BooksPage";
import BorrowPage from "./pages/BorrowPage";
import BookEditPage from "./pages/BookEditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import LogoutPage from "./pages/LogoutPage";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
  const { isLoggedIn, initializeFromStorage } = useAuthStore();

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  return (
    <ErrorBoundary>
      <nav style={{ padding: 12 }}>
        <Link to="/books">Books</Link> {" | "}
        <Link to="/borrow">Borrow/Return</Link> {" | "}
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link> {" | "}
            <Link to="/register">Register</Link>
          </>
        ) : (
          <Link to="/logout">Logout</Link>
        )}
      </nav>

      <main style={{ padding: 12 }}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Logout route */}
          <Route path="/logout" element={<LogoutPage />} />

          {/* Protected routes */}
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <BooksPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/:id/edit"
            element={
              <PrivateRoute>
                <BookEditPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/borrow"
            element={
              <PrivateRoute>
                <BorrowPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </ErrorBoundary>
  );
}
