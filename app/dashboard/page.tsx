import Dashboard from "@/components/dashboard";
import { fetchMovies } from "./getMovies";
import { useSearchParams } from 'next/navigation'

export default async function DashboardPage() {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0;
  const films = await fetchMovies(pageNumber);

  return <Dashboard films={films} />;
}