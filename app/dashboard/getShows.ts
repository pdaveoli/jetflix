import { getShows } from "../actions";

export async function fetchShows(pageNumber: number) {
    const shows = (await getShows(pageNumber));
    
    return shows.results;
}