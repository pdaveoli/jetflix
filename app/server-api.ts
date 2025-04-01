'use server';

import { cookies } from 'next/headers';
import { getOrCreateGuestSession, LIKED_MOVIES_COOKIE } from '@/lib/tmdb-service';
import { TMDB } from 'tmdb-ts';

const tmdb = new TMDB(process.env.TMDB_API_KEY || ''); 

// Server-only actions
export async function getMoviesServer(pageNumber: number) {
  const movies = await tmdb.trending.trending("movie", "week", {page: pageNumber});
  return movies;
}

export async function getShowsServer(pageNumber: number) {
  const shows = await tmdb.trending.trending("tv", "week", {page: pageNumber});
  return shows;
}

export async function getWatchProvidersServer(movieId: number) {
  const watchProviders = await tmdb.movies.watchProviders(movieId);
  return watchProviders.results.GB;
}

export async function getTVWatchProviders(showId: number) {
  const watchProviders = await tmdb.tvShows.watchProviders(showId);
  return watchProviders.results.GB;
}

export async function searchMoviesServer(query: string) {
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

export async function likeMovieServer(movieId: number) {
  const sessionId = await getOrCreateGuestSession();
  if (!sessionId) {
    console.error('No session ID available - cannot like movie');
    return { success: false, error: 'No session ID available' };
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.TMDB_API_KEY}&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: 10 }),
      }
    );
    
    const data = await response.json();
    
    // Store in cookies
    const cookieStore = await cookies();
    const likedMovies = JSON.parse(cookieStore.get(LIKED_MOVIES_COOKIE)?.value || '[]');
    
    if (!likedMovies.includes(movieId)) {
      likedMovies.push(movieId);
      await cookieStore.set({
        name: LIKED_MOVIES_COOKIE,
        value: JSON.stringify(likedMovies),
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }
    
    return { success: data.success };
  } catch (error) {
    console.error('Error liking movie:', error);
    return { success: false };
  }
}

export async function unlikeMovieServer(movieId: number) {
  const sessionId = await getOrCreateGuestSession();
  if (!sessionId) {
    console.error('No session ID available - cannot unlike movie');
    return { success: false, error: 'No session ID available' };
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.TMDB_API_KEY}&guest_session_id=${sessionId}`,
      {
        method: 'DELETE',
      }
    );
    
    const data = await response.json();
    
    // Also update cookies
    const cookieStore = await cookies();
    const likedMovies = JSON.parse(cookieStore.get(LIKED_MOVIES_COOKIE)?.value || '[]');
    const updatedLikes = likedMovies.filter((id: number) => id !== movieId);
    
    await cookieStore.set({
      name: LIKED_MOVIES_COOKIE,
      value: JSON.stringify(updatedLikes),
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    
    return { success: data.success };
  } catch (error) {
    console.error('Error unliking movie:', error);
    return { success: false };
  }
}

export async function getLikedMoviesServer() {
  const cookieStore = await cookies();
  const likedMoviesIds = JSON.parse(cookieStore.get(LIKED_MOVIES_COOKIE)?.value || '[]');
  
  if (likedMoviesIds.length === 0) return { results: [] };

  if (!process.env.TMDB_API_KEY) {
    console.error('TMDB API key not configured');
    return { results: [] };
  }
  
  try {
    // Get details for each liked movie
    const moviesPromises = likedMoviesIds.map((id: number) => 
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`)
        .then(res => res.json())
    );
    
    const movies = await Promise.all(moviesPromises);
    return { results: movies };
  } catch (error) {
    console.error('Error fetching liked movies:', error);
    return { results: [] };
  }
} 