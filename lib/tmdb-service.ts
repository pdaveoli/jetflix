import { TMDB } from 'tmdb-ts';
import { cookies } from 'next/headers';

const TMDB_API_KEY = process.env.TMDB_API_KEY || '';
const GUEST_SESSION_COOKIE = 'tmdb_guest_session';
export const LIKED_MOVIES_COOKIE = 'tmdb_liked_movies';

export async function getOrCreateGuestSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(GUEST_SESSION_COOKIE)?.value;
  
  if (sessionId) {
    return sessionId;
  }
  
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${TMDB_API_KEY}`
    );
    const data = await response.json();
    
    if (data.success) {
      await cookieStore.set({
        name: GUEST_SESSION_COOKIE,
        value: data.guest_session_id,
        expires: new Date(data.expires_at),
        path: '/',
      });
      
      return data.guest_session_id;
    }
    
    throw new Error('Failed to create guest session');
  } catch (error) {
    console.error('Error creating guest session:', error);
    return null;
  }
}