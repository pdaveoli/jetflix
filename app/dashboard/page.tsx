import Dashboard from "@/components/dashboard";
import { getMoviesServer, getLikedMoviesServer } from "@/app/server-api";
import { getRecommendations } from "@/lib/gemini-service";
import { fetchShows } from "./getShows";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  // Await the searchParams before accessing its properties
  const params = await searchParams;
  const pageParam = params.page;
  const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;
  
  // Fetch movies
  const moviesData = await getMoviesServer(pageNumber);
  const showsData = await fetchShows(pageNumber);
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
      shows={showsData}
      pageNumber={pageNumber} 
      recommendations={recommendations.recommendations}
      likedMovies={likedMoviesData.results} 
    />
  );
}
