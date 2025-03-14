"use client";

import { useState, useEffect } from "react";
import { UserProfile } from "@clerk/nextjs";
import {
  FaHome,
  FaFilm,
  FaTv,
  FaSearch,
  FaCog,
  FaThumbsUp,
  FaThumbsDown,
  FaPlay,
  FaStar,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { SiNetflix, SiAmazonprime, SiHbo } from "react-icons/si";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";
import { searchMoviesWrapper } from "@/app/dashboard/searchMovies";

const abbreviateNumber = (num: number, round: boolean): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  if (round)
    return (num.toFixed(1)).toString();
  else
    return num.toString();
};

// Helper function to extract year from date string
const getYearFromDate = (dateStr: string): string => {
  return dateStr.substring(0, 4);
};

interface DashboardProps {
  films: Array<{ id: number; title: string; overview: string; release_date: string; poster_path: string; vote_average: number; vote_count: number }>;
  pageNumber: number;
}

export default function Dashboard({ films, pageNumber }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("films");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent drawer from opening
  };

  // Search functionality
  useEffect(() => {
    const doSearch = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchMoviesWrapper(searchQuery);
        setSearchResults(results?.results || []);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      if (searchQuery) {
        doSearch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "films":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {films.map((film) => (
                <Drawer key={film.id}>
                  <DrawerTrigger asChild>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer">
                      <img
                        src={
                          "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/" +
                          film.poster_path
                        }
                        alt={film.title}
                        className="w-full object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{film.title}</h3>
                        <div
                          className="flex justify-between mt-2"
                          onClick={handleLikeClick}
                        >
                          <Button
                            variant="ghost"
                            className="text-green-500 hover:text-green-700"
                          >
                            <FaThumbsUp size={20} />
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaThumbsDown size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DrawerTrigger>

                  <DrawerContent className="p-0">
                    <div className="flex h-[80vh]">
                      {/* Left side - Full height image */}
                      <div className="h-full w-1/3 flex items-center justify-center bg-gray-900">
                        <img
                          src={
                            "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/" +
                            film.poster_path
                          }
                          alt={film.title}
                          className="h-full object-contain max-w-full"
                        />
                      </div>

                      {/* Right side - Content with close button */}
                      <div className="flex-1 p-6 relative flex flex-col">
                        <DrawerClose className="absolute top-4 right-4 rounded-full hover:bg-gray-100">
                          <Button variant="ghost" size="icon">
                            <FaTimes size={18} />
                          </Button>
                        </DrawerClose>

                        <DrawerHeader className="p-0 mb-6">
                          <DrawerTitle className="text-2xl font-bold">
                            {film.title}
                          </DrawerTitle>
                          <DrawerDescription className="text-gray-500">
                            {getYearFromDate(film.release_date)} • Action, Adventure • 2h 15m
                          </DrawerDescription>

                          {/* Rating */}
                          <div className="flex items-center mt-4">
                            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                              <FaStar className="text-yellow-500 mr-1" />
                              <span className="font-semibold">{abbreviateNumber(film.vote_average, true)}/10</span>
                            </div>
                            <span className="ml-2 text-sm text-gray-500">
                              ({abbreviateNumber(film.vote_count, false)} reviews)
                            </span>
                          </div>
                        </DrawerHeader>

                        {/* Description */}
                        <div className="mb-6">
                          <h3 className="font-semibold mb-2">Overview</h3>
                          <p className="text-gray-700">
                            {film.overview}
                          </p>
                        </div>

                        <div className="mt-auto">
                          {/* Watch Providers */}
                          <div className="mb-4">
                            <h3 className="font-semibold mb-3">Available on</h3>
                            <div className="flex space-x-4">
                              <Button
                                variant="outline"
                                className="p-2 h-auto"
                                aria-label="Netflix"
                              >
                                <SiNetflix size={24} className="text-red-600" />
                              </Button>
                              <Button
                                variant="outline"
                                className="p-2 h-auto"
                                aria-label="Amazon Prime"
                              >
                                <SiAmazonprime
                                  size={24}
                                  className="text-blue-500"
                                />
                              </Button>
                              <Button
                                variant="outline"
                                className="p-2 h-auto"
                                aria-label="HBO"
                              >
                                <SiHbo size={24} className="text-purple-600" />
                              </Button>
                            </div>
                          </div>

                          {/* Action Buttons - Now positioned at the very bottom */}
                          <div className="grid grid-cols-5 gap-4">
                            <Button className="bg-indigo-600 hover:bg-indigo-700 col-span-4">
                              <FaPlay className="mr-2" /> Watch Now
                            </Button>
                            <Button
                              variant="outline"
                              className="col-span-1"
                              aria-label="Add to watchlist"
                            >
                              <FaPlus size={18} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              ))}
            </div>

            {/* Pagination */}
            {pageNumber === 1 ? (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={"?page=" + pageNumber} isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={"?page=" + (pageNumber + 1)}>
                      {pageNumber + 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={"?page=" + (pageNumber + 2)}>
                      {pageNumber + 2}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href={"?page=" + (pageNumber + 1)} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            ) : (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href={"?page=" + (pageNumber - 1)} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={"?page=" + (pageNumber-1)}>
                      {pageNumber - 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={"?page=" + pageNumber} isActive>
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={"?page=" + (pageNumber + 1)}>
                      {pageNumber + 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href={"?page=" + (pageNumber + 1)} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        );
      
      case "series":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {films.map((film) => (
                <Drawer key={film.id}>
                  <DrawerTrigger asChild>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer">
                      <img
                        src={
                          "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/" +
                          film.poster_path
                        }
                        alt={film.title}
                        className="w-full object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{film.title} Series</h3>
                        <div
                          className="flex justify-between mt-2"
                          onClick={handleLikeClick}
                        >
                          <Button
                            variant="ghost"
                            className="text-green-500 hover:text-green-700"
                          >
                            <FaThumbsUp size={20} />
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaThumbsDown size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DrawerTrigger>

                  <DrawerContent className="p-0">
                    <div className="flex h-[80vh]">
                      {/* Left side - Full height image */}
                      <div className="h-full w-1/3 flex items-center justify-center bg-gray-900">
                        <img
                          src={
                            "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/" +
                            film.poster_path
                          }
                          alt={film.title}
                          className="h-full object-contain max-w-full"
                        />
                      </div>

                      {/* Right side - Content with close button */}
                      <div className="flex-1 p-6 relative flex flex-col">
                        <DrawerClose className="absolute top-4 right-4 rounded-full hover:bg-gray-100">
                          <Button variant="ghost" size="icon">
                            <FaTimes size={18} />
                          </Button>
                        </DrawerClose>

                        <DrawerHeader className="p-0 mb-6">
                          <DrawerTitle className="text-2xl font-bold">
                            {film.title}
                          </DrawerTitle>
                          <DrawerDescription className="text-gray-500">
                            {getYearFromDate(film.release_date)} • Drama, Adventure • 3 Seasons
                          </DrawerDescription>

                          {/* Rating */}
                          <div className="flex items-center mt-4">
                            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                              <FaStar className="text-yellow-500 mr-1" />
                              <span className="font-semibold">{abbreviateNumber(film.vote_average, true)}/10</span>
                            </div>
                            <span className="ml-2 text-sm text-gray-500">
                              ({abbreviateNumber(film.vote_count, false)} reviews)
                            </span>
                          </div>
                        </DrawerHeader>

                        {/* Description */}
                        <div className="mb-6">
                          <h3 className="font-semibold mb-2">Overview</h3>
                          <p className="text-gray-700">
                            {film.overview}
                          </p>
                        </div>

                        <div className="mt-auto">
                          {/* Watch Providers */}
                          <div className="mb-4">
                            <h3 className="font-semibold mb-3">Available on</h3>
                            <div className="flex space-x-4">
                              <Button
                                variant="outline"
                                className="p-2 h-auto"
                                aria-label="Netflix"
                              >
                                <SiNetflix size={24} className="text-red-600" />
                              </Button>
                              <Button
                                variant="outline"
                                className="p-2 h-auto"
                                aria-label="Amazon Prime"
                              >
                                <SiAmazonprime
                                  size={24}
                                  className="text-blue-500"
                                />
                              </Button>
                            </div>
                          </div>

                          {/* Action Buttons - Now positioned at the very bottom */}
                          <div className="grid grid-cols-5 gap-4">
                            <Button className="bg-indigo-600 hover:bg-indigo-700 col-span-4">
                              <FaPlay className="mr-2" /> Watch Now
                            </Button>
                            <Button
                              variant="outline"
                              className="col-span-1"
                              aria-label="Add to watchlist"
                            >
                              <FaPlus size={18} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              ))}
            </div>
          </>
        );

      case "search":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Search</h2>
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for movies, TV shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-4 pl-12 pr-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            {isSearching && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            )}

            {!isSearching && searchResults?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((result) => (
                  <Drawer key={result.id}>
                    <DrawerTrigger asChild>
                      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer">
                        <img
                          src={
                            result.poster_path
                              ? "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/" + result.poster_path
                              : "/placeholder-poster.png"
                          }
                          alt={result.title || result.name}
                          className="w-full object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">{result.title || result.name}</h3>
                          <p className="text-sm text-gray-500">
                            {result.media_type === 'tv' ? 'TV Series' : 'Movie'} • 
                            {result.release_date 
                              ? getYearFromDate(result.release_date) 
                              : result.first_air_date 
                                ? getYearFromDate(result.first_air_date)
                                : ""}
                          </p>
                          <div
                            className="flex justify-between mt-2"
                            onClick={handleLikeClick}
                          >
                            <Button
                              variant="ghost"
                              className="text-green-500 hover:text-green-700"
                            >
                              <FaThumbsUp size={20} />
                            </Button>
                            <Button
                              variant="ghost"
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaThumbsDown size={20} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DrawerTrigger>
                    
                    {/* Add the DrawerContent similar to the films case */}
                    <DrawerContent className="p-0">
                      {/* Content similar to films drawer */}
                    </DrawerContent>
                  </Drawer>
                ))}
              </div>
            )}
          </div>
        );

      case "settings":
        return (
          <div className="w-full h-full">
            <UserProfile
              appearance={{
                elements: {
                  rootBox: "w-full mx-auto max-w-4xl",
                  card: "rounded-xl shadow-lg border border-gray-100"
                }
              }}
            />
          </div>
        );

      case "home":
        return <div className="text-center p-8 text-xl">Welcome to Jetflix Home</div>;

      case "downloads":
        return <div className="text-center p-8 text-xl">Your Downloads</div>;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar - Fixed position */}
      <aside className="fixed w-20 bg-white shadow-md flex flex-col items-center justify-center py-4 h-full z-10">
        <nav className="flex flex-col space-y-6">
          <button
            className={`p-3 rounded-full ${
              activeTab === "home" ? "bg-indigo-600 text-white" : "text-gray-800"
            }`}
            onClick={() => setActiveTab("home")}
          >
            <FaHome size={24} />
          </button>
          <button
            className={`p-3 rounded-full ${
              activeTab === "films" ? "bg-indigo-600 text-white" : "text-gray-800"
            }`}
            onClick={() => setActiveTab("films")}
          >
            <FaFilm size={24} />
          </button>
          <button
            className={`p-3 rounded-full ${
              activeTab === "series" ? "bg-indigo-600 text-white" : "text-gray-800"
            }`}
            onClick={() => setActiveTab("series")}
          >
            <FaTv size={24} />
          </button>
          <button
            className={`p-3 rounded-full ${
              activeTab === "search" ? "bg-indigo-600 text-white" : "text-gray-800"
            }`}
            onClick={() => setActiveTab("search")}
          >
            <FaSearch size={24} />
          </button>
          <button
            className={`p-3 rounded-full ${
              activeTab === "settings" ? "bg-indigo-600 text-white" : "text-gray-800"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <FaCog size={24} />
          </button>
        </nav>
      </aside>

      {/* Main Content - Add margin-left to account for fixed sidebar */}
      <div className="flex-1 flex flex-col ml-20">
        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
