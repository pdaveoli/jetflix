"use client";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Script from "next/script";
import Image from "next/image";
import { AuthButtons } from "@/components/auth-buttons";
import { Inter } from "next/font/google";

// Correctly initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#2563eb" },
          elements: {
            formButtonPrimary:
              "bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-sm",
            socialButtonsBlockButton:
              "bg-transparent border border-gray-200 hover:border-indigo-600 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-300",
            socialButtonsBlockButtonText: "font-medium",
            formButtonReset:
              "bg-transparent border border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600 rounded-lg transition-colors duration-300",
            membersPageInviteButton:
              "bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300",
            card: "bg-white border border-gray-200 rounded-xl shadow-sm",
          },
        }}
      >
        <body className="h-screen bg-white">
          <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/logo.PNG"
                    alt="Jetflix"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                  <span className="text-xl font-bold text-gray-900">Jetflix</span>
                </div>
                <div className="flex items-center gap-4">
                  <SignedOut>
                    <AuthButtons />
                  </SignedOut>
                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </div>
              </div>
            </div>
          </nav>

          <main className="flex-1 w-full h-full">
            {children}
          </main>
        </body>
      </ClerkProvider>

      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </html>
  );
}
