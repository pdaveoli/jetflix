import Dashboard from "@/components/dashboard";
import { getMovies, getLikedMovies } from "@/app/actions";
import { getRecommendations } from "@/lib/gemini-service";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>
}) {
  const { page } = await searchParams;
  const pageParam = page as string | undefined;
  const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;
  
  // Fetch movies
  const moviesData = await getMovies(pageNumber);
  
  // Get liked movies and recommendations
  const likedMoviesData = await getLikedMovies();
  let recommendations = { recommendations: [] };
  
  if (likedMoviesData.results.length > 0) {
    recommendations = await getRecommendations(likedMoviesData.results);
  }
  
  const films = moviesData.results;

  return (
    <Dashboard 
      films={films} 
      pageNumber={pageNumber} 
      recommendations={recommendations.recommendations}
      likedMovies={likedMoviesData.results} 
    />
  );
}
