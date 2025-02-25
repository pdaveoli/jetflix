import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] bg-gray-300">
        <Image
          src="/hero.jpg"
          alt="Featured Movie"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/30 p-6">
          <h1 className="text-4xl font-bold">Welcome to Jetflix</h1>
          <p className="mt-2 text-lg max-w-lg">
            Stream the best movies and TV shows with an elevated entertainment experience.
          </p>
          <SignedOut>
            <SignInButton>
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">
                Sign In to Start Watching
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      {/* Movie Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {['Trending Now', 'Top Picks for You', 'New Releases', 'Action Movies'].map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            <div className="flex space-x-4 overflow-x-scroll no-scrollbar">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="w-48 h-72 bg-gray-200 rounded-lg shadow-md overflow-hidden relative">
                  <Image
                    src={`/placeholder-movie-${index % 5 + 1}.jpg`}
                    alt="Movie Poster"
                    width={192}
                    height={288}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
