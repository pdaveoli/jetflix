"use client";

import { TMDB } from 'tmdb-ts';

// Use a hardcoded API key for client-side only
// In production, you would use a proper API route to protect this key
const tmdb = new TMDB('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTY3MDFjYzVlMmNiOTk3MDk1MTc2NzdlNWM3YjljZCIsIm5iZiI6MTczODg2NTgwMi42NzIsInN1YiI6IjY3YTRmYzhhZjE5NmE3M2FlNzY2ZjJkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rqg9Hs02YOffcPuTOmCbfHgnz0uf4wsDsin1fwQj7sA'); 

// Client-side functions
export async function getMovies(pageNumber: number) {
  const movies = await tmdb.trending.trending("movie", "week", {page: pageNumber});
  return movies;
}

export async function getWatchProviders(movieId: number) {
  const watchProviders = await tmdb.movies.watchProviders(movieId);
  return watchProviders.results.GB;
}

export async function searchMovies(query: string) {
  try {
    const data = await tmdb.search.multi({ query });
    
    // Filter results to only include movies and TV shows with posters
    const filteredResults = data.results.filter(
      (item: any) => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path
    );
    
    return {
      results: filteredResults,
      total_results: filteredResults.length
    };
  } catch (error) {
    console.error('Error in searchMovies action:', error);
    return { results: [], total_results: 0 };
  }
}

// Client-side stubs that call server actions
// These call the server actions from server-api.ts
export async function likeMovie(movieId: number) {
  try {
    const response = await fetch(`/api/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ movieId }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error liking movie:', error);
    return { success: false };
  }
}

export async function unlikeMovie(movieId: number) {
  try {
    const response = await fetch(`/api/unlike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ movieId }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error unliking movie:', error);
    return { success: false };
  }
}

export async function getLikedMovies() {
  try {
    const response = await fetch('/api/liked-movies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching liked movies:', error);
    return { results: [] };
  }
}

// These functions are no-ops in the client version
// We'll add actual implementation later if needed
export async function signUpUser() {
  console.log("Not implemented");
}

export async function addLikedMovie(movieId: string) {
  console.log("Not implemented");
}

export async function addDislikedMovie(movieId: string) {
  console.log("Not implemented");
}

export async function removeLikedMovie(movieId: string) {
  console.log("Not implemented");
}