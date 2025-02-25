import { Button } from "@/components/ui/button"
import { FormEvent } from "react";
import { addLikedMovie, addDislikedMovie, removeLikedMovie } from "@/app/actions";


export default function TestPage() {

    const handleAddLikedMovie = async (event: FormEvent) => {
        event.preventDefault();
        const movieId = (event.target as HTMLFormElement).movieId.value;
        await addLikedMovie(movieId);
    };

    const handleAddDislikedMovie = async (event: FormEvent) => {
        event.preventDefault();
        const movieId = (event.target as HTMLFormElement).movieId.value;
        await addDislikedMovie(movieId);
    };

    const handleRemoveLikedMovie = async (event: FormEvent) => {
        event.preventDefault();
        const movieId = (event.target as HTMLFormElement).movieId.value;
        await removeLikedMovie(movieId);
    };

    return (
        <div>
            <h1>Test Page</h1>
            <form onSubmit={handleAddLikedMovie}>
                <label htmlFor="movieId">Movie ID</label>
                <input placeholder="Movie ID" id="movieId" name="movieId" />
                <Button type="submit">Add to liked movies</Button>
            </form>
            <form onSubmit={handleAddDislikedMovie}>
                <label htmlFor="movieId">Movie ID</label>
                <input placeholder="Movie ID" id="movieId" name="movieId" />
                <Button type="submit">Add to disliked movies</Button>
            </form>
            <form onSubmit={handleRemoveLikedMovie}>
                <label htmlFor="movieId">Movie ID</label>
                <input placeholder="Movie ID" id="movieId" name="movieId" />
                <Button type="submit">Remove from liked movies</Button>
            </form>
            <form>
                <label htmlFor="movieId">Movie ID</label>
                <input placeholder="Movie ID" id="movieId" name="movieId" />
                <Button type="submit">Remove from disliked movies</Button>
            </form>
        </div>
    )
}