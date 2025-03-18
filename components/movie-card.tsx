'use client';

import { useState } from 'react';
import Image from 'next/image';
import { likeMovie, unlikeMovie } from '@/app/server-actions';

// Define Movie interface
interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
}

export default function MovieCard({ movie, isLiked = false }: { movie: Movie; isLiked?: boolean }) {
  const [liked, setLiked] = useState(isLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeToggle = async () => {
    setIsLoading(true);
    
    try {
      if (liked) {
        await unlikeMovie(movie.id);
        setLiked(false);
      } else {
        await likeMovie(movie.id);
        setLiked(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {movie.poster_path ? (
        <Image 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name || 'Movie poster'}
          width={500}
          height={750}
          className="w-full h-auto"
        />
      ) : (
        <div className="bg-gray-700 h-64 flex items-center justify-center">
          <span>No image available</span>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-lg font-semibold">{movie.title || movie.name}</h3>
        <p className="text-sm text-gray-400">
          {new Date(movie.release_date || movie.first_air_date || '').getFullYear() || 'Unknown'}
        </p>
        
        <button
          onClick={handleLikeToggle}
          disabled={isLoading}
          className={`mt-2 p-2 rounded-full ${
            liked ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          {liked ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}