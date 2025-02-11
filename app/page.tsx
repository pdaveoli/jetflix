"use client";

import { ClerkProvider, SignInButton } from "@clerk/nextjs";
import "./globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Faq } from "@/components/faq";


const geistSans = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });


// Updated RootLayout
export default function Home() {
  return (
    <main className="container max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Stream Differently
        </h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-xl text-gray-600 mb-8">
            Welcome to Jetflix - where innovation meets entertainment.
            Discover a new era of streaming with our curated content
            and cutting-edge technology.
          </p>
        </div>
      </div>
      <Faq />
    </main>
  );
}