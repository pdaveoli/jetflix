import { getMovies } from "../actions";

export async function fetchMovies() {
    const films = (await getMovies()).results;
    return films;
}
