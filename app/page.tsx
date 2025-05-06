"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Faq } from "@/components/faq";
import { Button } from "@/components/ui/button";
import { SignUpButton, useUser } from "@clerk/nextjs";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleExploreFeaturesClick = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Check if the user is logged in
  const { isSignedIn, isLoaded } = useUser();

  if (isSignedIn) {
    // Redirect to the dashboard if the user is logged in
    window.location.href = "/dashboard";
    return null;
  }


  return (
    <main className={`min-h-screen bg-white ${inter.className}`}>
      <section className="py-24 text-center bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Stream Differently
            </h1>
            <div className="max-w-2xl mx-auto">
              <p className="text-xl text-gray-600 mb-8">
                Welcome to Jetflix - where innovation meets entertainment.
                Discover a new era of streaming with our curated content
                and cutting-edge technology.
              </p>
              <div className="flex justify-center gap-4">
                <SignUpButton>
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                    Start Free Trial
                  </Button>
                </SignUpButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-gray-600"
                  onClick={handleExploreFeaturesClick}
                >
                  Explore Features
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features-section" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {['4K Streaming', 'AI Recommendations', 'Offline Viewing'].map((feature) => (
              <div key={feature} className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature}</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Faq />
        </div>
      </section>
      <Footer />
    </main>
  );
}