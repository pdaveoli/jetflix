import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Script from "next/script";
import { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Jetflix",
  description: "Premium streaming experience reimagined",
  openGraph: { images: ["/og.png"] },
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

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
          <div className="fixed inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
          
          <main className="container max-w-4xl mx-auto px-4 py-20">
            <h1 className="text-6xl md:text-7xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Jetflix
            </h1>
            
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8">
              {children}
            </div>
          </main>
        </body>
      </ClerkProvider>

      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </html>
  );
}