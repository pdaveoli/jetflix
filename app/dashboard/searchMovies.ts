import { searchMovies as searchMoviesAction } from "../actions";

export async function searchMoviesWrapper(query: string) {
    // Don't search if query is empty
    if (!query || query.trim() === '') {
        return { results: [], total_results: 0 };
    }
    
    try {
        // Use the existing action function that already has API key handling
        const searchResults = await searchMoviesAction(query);
        
        // Return results in the same format as fetchMovies
        return searchResults;
    } catch (error) {
        console.error('Error searching movies:', error);
        return { results: [], total_pages: 0, total_results: 0 };
    }
}