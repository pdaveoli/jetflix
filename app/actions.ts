import { TMDB } from 'tmdb-ts';


/* import db from '@/lib/firestore'; */
/* import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { currentUser } from '@clerk/nextjs/server';
*/
const tmdb = new TMDB('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTY3MDFjYzVlMmNiOTk3MDk1MTc2NzdlNWM3YjljZCIsIm5iZiI6MTczODg2NTgwMi42NzIsInN1YiI6IjY3YTRmYzhhZjE5NmE3M2FlNzY2ZjJkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rqg9Hs02YOffcPuTOmCbfHgnz0uf4wsDsin1fwQj7sA'); 

export async function getMovies(pageNumber: number) {
  const movies = await tmdb.trending.trending("movie", "week", {page: pageNumber});
  return movies;
}

export async function searchMovies(query: string) {
    'use server';
    
    try {
        // Using the existing pattern, fetch from TMDB without exposing the API key
        const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`, 
            { next: { revalidate: 60 } }
        );
        
        if (!response.ok) {
            throw new Error(`Failed to fetch search results: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Filter to only include movies and TV shows
        const filteredResults = data.results.filter(
            (item: any) => (item.media_type === 'movie' || item.media_type === 'tv')
        );
        
        return {
            results: filteredResults,
            total_results: filteredResults.length,
            total_pages: data.total_pages
        };
    } catch (error) {
        console.error('Error in searchMovies action:', error);
        throw error;
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