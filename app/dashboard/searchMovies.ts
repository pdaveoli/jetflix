"use client";

// Import the client-side action
import { searchMovies } from "../actions";
import { useState } from 'react';

/**
 * Wrapper function for the searchMovies client action
 * @param query The search query string
 * @returns Search results or empty array on error
 */
export async function searchMoviesWrapper(query: string) {
  if (!query || query.trim() === '') {
    return { results: [], total_results: 0 };
  }
  
  try {
    const searchResults = await searchMovies(query);
    return searchResults;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [], total_results: 0 };
  }
}

export function useMovieSearch() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = async (searchQuery: string) => {
    setIsSearching(true);
    try {
      const results = await searchMoviesWrapper(searchQuery);
      setSearchResults(results?.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  return { searchResults, isSearching, handleSearch };
}