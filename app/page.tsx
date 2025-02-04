import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"
import "./home.css"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "./components/footer"

export default function Home() {
  return (
    <>
      <main className="netflix-bg">
        {/* Navigation Bar */}
        <nav className="nav">
          <div className="nav__container">
            <Image
              src="/netflix-logo.png" // Replace with your Netflix logo path
              alt="Netflix"
              width={120}
              height={40}
              className="nav__logo"
            />
            <div className="nav__actions">
              <SignedOut>
                <SignInButton>
                  <button className="nav__signin">Sign In</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="nav__dashboard">
                  Dashboard
                </Link>
              </SignedIn>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero__content">
            <h1 className="hero__title">
              Unlimited movies, TV shows, and more
            </h1>
            <p className="hero__subtitle">Watch anywhere. Cancel anytime.</p>
            <p className="hero__description">
              Ready to watch? Create your membership to get started.
            </p>
            <div className="hero__cta">
              <SignedOut>
                <SignInButton>
                  <button className="cta-button">Get Started</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="cta-button">
                  Start Watching
                </Link>
              </SignedIn>
            </div>
          </div>
          <div className="hero__overlay" />
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="feature">
            <div className="feature__text">
              <h2>Enjoy on your TV</h2>
              <p>
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
                Blu-ray players, and more.
              </p>
            </div>
            <div className="feature__image">
              {/* Add your TV image here */}
            </div>
          </div>

          <div className="feature reverse">
            <div className="feature__text">
              <h2>Download your shows to watch offline</h2>
              <p>
                Save your favorites easily and always have something to watch.
              </p>
            </div>
            <div className="feature__image">
              {/* Add your mobile image here */}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}