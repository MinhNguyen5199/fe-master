// src/app/components/BookList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { fetchSimpleBookList } from '../lib/books/fetchBooks';
import { Book } from '../lib/types';
import BookCard from './ui/BookCard'; // Make sure the path is correct

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const result = await fetchSimpleBookList();
      if (result.data) {
        setBooks(result.data);
      } else {
        setError(result.message || 'Failed to fetch books');
      }
      setLoading(false);
    };

    loadBooks();
  }, []);

  if (loading) return <p className="text-center text-gray-600 dark:text-gray-300">Loading books...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (books.length === 0) return <p className="text-center text-gray-600 dark:text-gray-300">No books found.</p>;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {books.map((book) => (
          <BookCard key={book.book_id} book={book} />
        ))}
      </div>
    </div>
  );
}