import Dashboard from "@/components/dashboard";
import { getMovies } from "@/app/actions";

// Define correct types for Next.js App Router page props
interface PageProps {
  params: { slug?: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DashboardPage({
  searchParams
}: PageProps) {
  // Get the page number from URL or default to 1
  const pageParam = searchParams.page as string | undefined;
  const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;
  
  // Fetch movies directly using the server action
  const moviesData = await getMovies(pageNumber);
  
  // Extract the results to pass to the Dashboard component
  const films = moviesData.results;

  return <Dashboard films={films} />;
}