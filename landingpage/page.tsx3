import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-4xl font-bold">Jetflix</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/signin" className="hover:text-indigo-400">Sign In</Link>
              </li>
              <li>
                <Link href="/signup" className="bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500">
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <section className="my-24 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Find Everything You Want to Watch</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover movies and shows across all your streaming services in one place
          </p>
          <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-md text-lg font-medium">
            Start Your Free Trial
          </Link>
        </section>
      </div>
    </main>
  );
}