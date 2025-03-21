'use server';

import { cookies } from 'next/headers';
import { getOrCreateGuestSession, LIKED_MOVIES_COOKIE } from '@/lib/tmdb-service';

export async function likeMovie(movieId: number) {
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

export async function unlikeMovie(movieId: number) {
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

export async function getLikedMovies() {
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