"use client";

import { ClerkProvider, SignInButton } from "@clerk/nextjs";
import "./globals.css";
import Script from "next/script";
import { Metadata } from "next";
import localFont from "next/font/local";
import { useState } from "react";
import { Inter } from "next/font/google";

const geistSans = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });


// FAQ component (needs to be client-side for interactivity)
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "What makes Jetflix different?",
      answer: "Our platform combines cutting-edge technology with curated content selection, offering personalized streaming experiences powered by AI recommendations."
    },
    {
      question: "How much does it cost?",
      answer: "We offer flexible plans starting from $9.99/month. Cancel anytime with no hidden fees."
    },
    {
      question: "Can I watch offline?",
      answer: "Yes! Download your favorite content to watch anywhere, anytime without an internet connection."
    }
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((item, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <span className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-4 pt-2 border-t border-gray-100 text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Modern footer component
const Footer = () => (
  <footer className="bg-gradient-to-b from-white to-blue-50 border-t border-gray-100 mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Jetflix</h3>
          <p className="text-sm text-gray-500">
            Redefining streaming through innovation and quality.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-900">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition">Privacy Policy</a></li>
            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition">Terms of Service</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-900">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition">Help Center</a></li>
            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition">Contact Us</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-900">Connect</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition">
              <span className="sr-only">GitHub</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Jetflix. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// Updated RootLayout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#000000" },
          elements: {
            formButtonPrimary:
              "bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm",
            socialButtonsBlockButton:
              "border-gray-200 hover:border-black text-gray-600 hover:text-black",
            card: "shadow-lg border border-gray-100",
          },
        }}
      >
        <body className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
          <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Jetflix</h1>
                <SignInButton>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                    Sign In
                  </button>
                </SignInButton>
              </div>
            </div>
          </nav>

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

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-16">
              {children}
            </div>

            <FAQ />
          </main>

          <Footer />
        </body>
      </ClerkProvider>

      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </html>
  );
}