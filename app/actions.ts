import { TMDB } from 'tmdb-ts';
import { cookies } from 'next/headers';
import { getOrCreateGuestSession, LIKED_MOVIES_COOKIE } from '@/lib/tmdb-service';

/* import db from '@/lib/firestore'; */
/* import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { currentUser } from '@clerk/nextjs/server';
*/
const tmdb = new TMDB('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTY3MDFjYzVlMmNiOTk3MDk1MTc2NzdlNWM3YjljZCIsIm5iZiI6MTczODg2NTgwMi42NzIsInN1YiI6IjY3YTRmYzhhZjE5NmE3M2FlNzY2ZjJkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rqg9Hs02YOffcPuTOmCbfHgnz0uf4wsDsin1fwQj7sA'); 

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

// Function to sign up the user to the Firestore database
 export async function signUpUser() {
  /*try {
    const user = await currentUser();
    if (!user) return;

    const userRef = doc(collection(db, 'users'), user.id);
    await setDoc(userRef, {
      id: user.id,
      likedMovies: [],
      dislikedMovies: []
    });
  } catch (error) {
    console.error('Error signing up user:', error);
  } */
  console.log("Not implemented");
} 

 // Function to add a liked movie to the user's document
export async function addLikedMovie(movieId: string) {
  /*try {
    const user = await currentUser();
    if (!user) return;

    const userRef = doc(collection(db, 'users'), user.id);
    await updateDoc(userRef, {
      likedMovies: arrayUnion(movieId)
    });
  } catch (error) {
    console.error('Error adding liked movie:', error);
  }*/
    console.log("Not implemented");
}

// Function to add a disliked movie to the user's document
export async function addDislikedMovie(movieId: string) {
  /*
  try {
    const user = await currentUser();
    if (!user) return;

    const userRef = doc(collection(db, 'users'), user.id);
    await updateDoc(userRef, {
      dislikedMovies: arrayUnion(movieId)
    });
  } catch (error) {
    console.error('Error adding disliked movie:', error);
  }
    */
    console.log("Not implemented");
}

// Function to remove a liked movie from the user's document
export async function removeLikedMovie(movieId: string) {
  /*try {
    const user = await currentUser();
    if (!user) return;

    const userRef = doc(collection(db, 'users'), user.id);
    await updateDoc(userRef, {
      likedMovies: arrayRemove(movieId)
    });
  } catch (error) {
    console.error('Error removing liked movie:', error);
  }
    */
    console.log("Not implemented"); 
}

// Function to remove a disliked movie from the user's document
async function removeDislikedMovie(movieId: string) {
  /*
  try {
    const user = await currentUser();
    if (!user) return;

    const userRef = doc(collection(db, 'users'), user.id);
    await updateDoc(userRef, {
      dislikedMovies: arrayRemove(movieId)
    });
  } catch (error) {
    console.error('Error removing disliked movie:', error);
  }
    */
    console.log("Not implemented");
}

// Store of liked movies (in a real app, use a database)
export async function likeMovie(movieId: number) {
  'use server';
  
  const sessionId = await getOrCreateGuestSession();
  if (!sessionId) return { success: false };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.TMDB_API_KEY}&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: 10 }), // Rate it 10/10
      }
    );
    
    const data = await response.json();
    
    // Also store in cookies for easy access
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
  'use server';
  
  const sessionId = await getOrCreateGuestSession();
  if (!sessionId) return { success: false };

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
  'use server';
  
  const cookieStore = await cookies();
  const likedMoviesIds = JSON.parse(cookieStore.get(LIKED_MOVIES_COOKIE)?.value || '[]');
  
  if (likedMoviesIds.length === 0) return { results: [] };
  
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