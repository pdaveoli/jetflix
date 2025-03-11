import { getMovies } from "../actions";

export async function fetchMovies(pageNumber: number) {
    const films = (await getMovies(pageNumber));
    
    return films.results;
}
