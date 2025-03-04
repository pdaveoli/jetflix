"use client"

import { useState } from "react";
import { FaHome, FaFilm, FaTv, FaDownload, FaCog, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

interface DashboardProps {
  films: Array<{ id: number; title: string; poster_path: string }>;
}


export default async function Dashboard({ films} : DashboardProps) {
  const [activeTab, setActiveTab] = useState("films");

    

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
                <div key={film.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={"https://media.themoviedb.org/t/p/w300_and_h450_bestv2/" + film.poster_path} alt={film.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{film.title}</h3>
                    <div className="flex justify-between mt-2">
                      <button className="text-green-500 hover:text-green-700">
                        <FaThumbsUp size={20} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FaThumbsDown size={20} />
                      </button>
                    </div>
                  </div>
                </div>
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