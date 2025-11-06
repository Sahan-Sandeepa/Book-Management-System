import React, { Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import BookEditPage from './pages/BookEditPage';
import BorrowPage from './pages/BorrowPage';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <nav style={{ padding: 12 }}>
        <Link to="/">Books</Link> {' | '}
        <Link to="/borrow">Borrow/Return</Link>
      </nav>

      <main style={{ padding: 12 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookEditPage />} />
            <Route path="/borrow" element={<BorrowPage />} />
          </Routes>
        </Suspense>
      </main>
    </ErrorBoundary>
  );
}
