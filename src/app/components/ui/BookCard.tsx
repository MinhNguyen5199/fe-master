'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Book } from '../../lib/types'; // Assuming this type is defined elsewhere
import { useRouter } from 'next/navigation';

interface BookCardProps {
  book: Book;
}

const fallbackImage = 'https://placehold.co/300x450/000000/FFFFFF?text=No+Cover';

const BookCard = ({ book }: BookCardProps) => {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState(book.cover_image_url);

  const handleViewSummary = (bookId: string) => {
    router.push(`/views/books/${bookId}`);
  };

  return (
    <div
      onClick={() => handleViewSummary(book.book_id)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl bg-gray-900 shadow-lg"
    >
      {/* --- Image & Gradient --- */}
      {/* Note: Removed extra opacity-80 for cleaner rendering */}
      <div className="relative w-full aspect-[2.5/3] bg-black">
        <Image
          src={imgSrc || fallbackImage}
          alt={`Cover of ${book.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          onError={() => setImgSrc(fallbackImage)}
        />
        <div
          className="absolute inset-0 opacity-50 bg-gradient-to-t from-black/80 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* --- Text Content --- */}
      <div className="absolute bottom-0 z-10 p-6 text-white w-full">
        {/* IMPROVEMENT: Title is forced to a single line and will show '...' if too long. */}
        <h3 className="whitespace-nowrap overflow-hidden text-ellipsis text-[1.3rem] font-bold [text-shadow:0_2px_4px_rgba(0,0,0,0.7)]">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-gray-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          by {book.authors.join(', ')}
        </p>

        {/* --- Details Revealed on Hover --- */}
        <div className="mt-4 max-h-0 transform-gpu overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-hover:max-h-40 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
          <div className="flex flex-wrap gap-2">
            {book.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur-sm"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;