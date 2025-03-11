"use client"

import { useState } from "react";
import { FaHome, FaFilm, FaTv, FaDownload, FaCog, FaThumbsUp, FaThumbsDown, FaPlay, FaStar, FaPlus, FaTimes } from "react-icons/fa";
import { SiNetflix, SiAmazonprime, SiHulu, SiHbo } from "react-icons/si";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

interface DashboardProps {
  films: Array<{ id: number; title: string; poster_path: string }>;
}

export default function Dashboard({ films }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("films");
  
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent drawer from opening
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <aside className="w-20 bg-white shadow-md flex flex-col items-center justify-center py-4">
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
              activeTab === "downloads" ? "bg-indigo-600 text-white" : "text-gray-800"
            }`}
            onClick={() => setActiveTab("downloads")}
          >
            <FaDownload size={24} />
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "films" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {films.map((film) => (
                <Drawer key={film.id}>
                  <DrawerTrigger asChild>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer">
                      <img 
                        src={"https://media.themoviedb.org/t/p/w300_and_h450_bestv2/" + film.poster_path} 
                        alt={film.title} 
                        className="w-300 h-450 object-cover" 
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{film.title}</h3>
                        <div className="flex justify-between mt-2" onClick={handleLikeClick}>
                          <Button className="text-green-500 hover:text-green-700">
                            <FaThumbsUp size={20} />
                          </Button>
                          <Button className="text-red-500 hover:text-red-700">
                            <FaThumbsDown size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="h-[80vh] max-h-[80vh] p-0">
                    <div className="flex h-full">
                      {/* Left side - Full height image */}
                      <div className="h-full w-1/3 flex-shrink-0">
                        <img 
                          src={"https://media.themoviedb.org/t/p/w300_and_h450_bestv2/" + film.poster_path}
                          alt={film.title}
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      
                      {/* Right side - Content */}
                      <div className="flex-1 p-6 relative">
                        {/* Close button in top right */}
                        <DrawerClose className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100">
                          <FaTimes size={20} />
                        </DrawerClose>
                        
                        <DrawerHeader className="p-0 mb-6">
                          <DrawerTitle className="text-2xl font-bold">{film.title}</DrawerTitle>
                          <DrawerDescription className="text-gray-500">
                            2023 • Action, Adventure • 2h 15m
                          </DrawerDescription>
                          
                          {/* Rating */}
                          <div className="flex items-center mt-4">
                            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                              <FaStar className="text-yellow-500 mr-1" />
                              <span className="font-semibold">8.5/10</span>
                            </div>
                            <span className="ml-2 text-sm text-gray-500">(2.5k reviews)</span>
                          </div>
                        </DrawerHeader>
                        
                        {/* Description */}
                        <div className="mb-6">
                          <h3 className="font-semibold mb-2">Overview</h3>
                          <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                          </p>
                        </div>
                        
                        {/* Watch Providers */}
                        <div className="mb-6">
                          <h3 className="font-semibold mb-3">Available on</h3>
                          <div className="flex space-x-4">
                            <div className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
                              <SiNetflix size={24} className="text-red-600" />
                            </div>
                            <div className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
                              <SiAmazonprime size={24} className="text-blue-500" />
                            </div>
                            <div className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
                              <SiHulu size={24} className="text-green-500" />
                            </div>
                            <div className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
                              <SiHbo size={24} className="text-purple-600" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-4 mt-8">
                          <Button className="flex-1 bg-indigo-600 text-white py-6 rounded-xl hover:bg-indigo-700">
                            <FaPlay className="mr-2" /> Watch Now
                          </Button>
                          <Button className="bg-gray-200 text-gray-800 py-6 px-6 rounded-xl hover:bg-gray-300">
                            <FaPlus size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              ))}
            </div>
          )}
          {activeTab === "home" && <div>Home Content</div>}
          {activeTab === "series" && <div>Series Content</div>}
          {activeTab === "downloads" && <div>Downloads Content</div>}
          {activeTab === "settings" && <div>Settings Content</div>}
        </main>
      </div>
    </div>
  );
}