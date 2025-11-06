import { Routes, Route, Link } from "react-router-dom";
import { Suspense } from "react";
import BooksPage from "./pages/BooksPage";
import BorrowPage from "./pages/BorrowPage";
import BookEditPage from "./pages/BookEditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <nav style={{ padding: 12 }}>
        <Link to="/books">Books</Link> {" | "}
        <Link to="/borrow">Borrow/Return</Link> {" | "}
        <Link to="/login">Login</Link> {" | "}
        <Link to="/register">Register</Link>
      </nav>

      <main style={{ padding: 12 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

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
        </Suspense>
      </main>
    </ErrorBoundary>
  );
}
