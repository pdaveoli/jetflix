import { TMDB } from 'tmdb-ts';


/* import db from '@/lib/firestore'; */
/* import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { currentUser } from '@clerk/nextjs/server';
*/
const tmdb = new TMDB('095d10d1bdc8d14ed4bc2ccb2447710b'); 

export async function getMovies() {
  const movies = await tmdb.trending.trending("movie", "week");
  return movies;
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