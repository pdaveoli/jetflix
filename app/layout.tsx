import { ClerkProvider, SignInButton, UserButton } from "@clerk/nextjs";
import "./globals.css";
import Script from "next/script";
import { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/footer";
import Image from "next/image";

export const metadata: Metadata = {
  metadataBase: new URL("https://clerk-next-app.vercel.app/"),
  title: "Jetflix",
  description:
    "Elevated entertainment experience with cutting-edge streaming technology.",
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
          variables: { colorPrimary: "#ffffff" },
          elements: {
            formButtonPrimary:
              "bg-white text-black rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105",
            socialButtonsBlockButton:
              "bg-transparent border border-gray-700 hover:border-white rounded-full text-white hover:bg-white/10 transition-all duration-300",
            socialButtonsBlockButtonText: "font-medium",
            formButtonReset:
              "bg-transparent border border-gray-700 text-white hover:border-white rounded-full transition-colors duration-300",
            membersPageInviteButton:
              "bg-white text-black rounded-full hover:bg-opacity-80 transition-all duration-300",
            card: "bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl",
          },
        }}
      >
        <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent mix-blend-screen pointer-events-none" />

          <nav className="backdrop-blur-md bg-black/80 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between text-white">
                <Image
                  src="public/logo.png"
                  alt="Picture of the author"
                  // width={500} automatically provided
                  // height={500} automatically provided
                  // blurDataURL="data:..." automatically provided
                  placeholder="blur" // Optional blur-up while loading
                />
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  JETFLIX
                </h1>
                <UserButton />
                <SignInButton />
              </div>
            </div>
          </nav>

          <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </main>

          <Footer />
        </body>
      </ClerkProvider>

      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </html>
  );
}
