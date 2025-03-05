import Dashboard from "@/components/dashboard";
import { getMovies } from "@/app/actions";

// Remove custom interface as Next.js provides these types automatically
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>
}) {

  const { page } = await searchParams;
  // Get the page number from URL or default to 1
  const pageParam = page as string | undefined;
  const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;
  
  // Fetch movies directly using the server action
  const moviesData = await getMovies(pageNumber);
  
  // Extract the results to pass to the Dashboard component
  const films = moviesData.results;

  return <Dashboard films={films} />;
}
