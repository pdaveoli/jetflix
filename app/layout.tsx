import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-provider";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { AuthButtons } from "@/components/auth-buttons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jetflix - The Ultimate Movie Database",
  description: "Discover, rate, and discuss your favorite films and TV shows with Jetflix.",
  generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <MotionProvider>
              <nav className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Image
                        src="/logo.PNG"
                        alt="Jetflix"
                        width={40}
                        height={40}
                        className="h-10 w-10"
                        priority
                      />
                      <span className="text-xl font-bold text-gray-900 dark:text-white">Jetflix</span>
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
            </MotionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
