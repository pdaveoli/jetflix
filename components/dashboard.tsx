"use client"

import { useState } from "react";
import { FaHome, FaFilm, FaTv, FaDownload, FaCog, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("films");

  const films = [
    { id: 1, title: "Film 1", image: "/path/to/image1.jpg" },
    { id: 2, title: "Film 2", image: "/path/to/image2.jpg" },
    { id: 3, title: "Film 3", image: "/path/to/image3.jpg" },
    { id: 4, title: "Film 4", image: "/path/to/image4.jpg" },
    { id: 5, title: "Film 5", image: "/path/to/image5.jpg" },
    { id: 6, title: "Film 6", image: "/path/to/image6.jpg" },
    { id: 7, title: "Film 7", image: "/path/to/image7.jpg" },
    { id: 8, title: "Film 8", image: "/path/to/image8.jpg" },
    { id: 9, title: "Film 9", image: "/path/to/image9.jpg" },
    { id: 10, title: "Film 10", image: "/path/to/image10.jpg" },
    // Add more films as needed
  ];

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
                  <img src={film.image} alt={film.title} className="w-full h-48 object-cover" />
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