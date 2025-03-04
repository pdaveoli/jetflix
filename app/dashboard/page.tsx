import Dashboard from "@/components/dashboard";
import { fetchMovies } from "./getMovies";

export default async function DashboardPage() {

  const films = await fetchMovies();

  return <Dashboard films={films} />;
}