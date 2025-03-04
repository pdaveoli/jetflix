import Dashboard from "@/components/dashboard";
import { fetchMovies } from "./getMovies";
import { GetServerSideProps } from "next";

interface DashboardPageProps {
  films: Array<{ id: number; title: string; poster_path: string }>;
}

export default function DashboardPage({ films }: DashboardPageProps) {
  return <Dashboard films={films} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const pageNumber = query.page ? parseInt(query.page as string) : 0;
  const films = await fetchMovies(pageNumber);

  return {
    props: {
      films,
    },
  };
};