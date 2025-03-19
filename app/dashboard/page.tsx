import Dashboard from "@/components/dashboard";
import { getMoviesServer, getLikedMoviesServer } from "@/app/server-api";
import { getRecommendations } from "@/lib/gemini-service";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const pageParam = searchParams.page;
  const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;
  
  // Fetch movies
  const moviesData = await getMoviesServer(pageNumber);
  
  // Get liked movies and recommendations
  const likedMoviesData = await getLikedMoviesServer();
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
