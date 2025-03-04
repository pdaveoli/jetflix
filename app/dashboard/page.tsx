import Dashboard from "@/components/dashboard";
import { getMovies } from "@/app/actions";

// In App Router, page components automatically receive searchParams
export default async function DashboardPage({
  searchParams
}: {
  searchParams: { page?: string }
}) {
  // Get the page number from URL or default to 1
  const pageNumber = searchParams.page ? parseInt(searchParams.page) : 1;
  
  // Fetch movies directly using the server action
  const moviesData = await getMovies(pageNumber);
  
  // Extract the results to pass to the Dashboard component
  const films = moviesData.results;

  return <Dashboard films={films} />;
}