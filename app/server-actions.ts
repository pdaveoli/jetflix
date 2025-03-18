'use server';

import { cookies } from 'next/headers';
import { getOrCreateGuestSession, LIKED_MOVIES_COOKIE } from '@/lib/tmdb-service';

export async function likeMovie(movieId: number) {
  const sessionId = await getOrCreateGuestSession();
  if (!sessionId) return { success: false };

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
  // Copy your unlikeMovie function here
  // ...
}

export async function getLikedMovies() {
  // Copy your getLikedMovies function here
  // ...
}