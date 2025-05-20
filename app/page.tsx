"use client";

import Link from "next/link";
import Image from "next/image"; // Ensure Image is imported if used, or remove if not.
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle"; // Assuming this exists in main components
import { ChevronRight, Film, Star, TrendingUp, Play, Award, Clock } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

// Animation variants (copied from the more feature-rich page.tsx)
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2 + i * 0.1,
    },
  }),
  hover: {
    y: -15,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
};

const movieCardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.1 + i * 0.1,
    },
  }),
  hover: {
    y: -10,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
};

// Custom hook for scroll-triggered animations
function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return [ref, isInView];
}

export default function Home() {
  const [featuresRef, featuresInView] = useScrollAnimation();
  const [trendingRef, trendingInView] = useScrollAnimation();
  const [ctaRef, ctaInView] = useScrollAnimation();

  // Parallax effect for hero section
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  // const y2 = useTransform(scrollY, [0, 500], [0, -50]); // y2 was unused in the provided landing page code
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Featured movies data
  const featuredMovies = [
    {
      title: "Dune: Part Two",
      rating: "8.9",
      genre: "Sci-Fi",
      year: "2024",
      director: "Denis Villeneuve",
      image: "/placeholder.svg?height=600&width=400&text=Dune:Part Two",
    },
    {
      title: "Oppenheimer",
      rating: "9.1",
      genre: "Drama",
      year: "2023",
      director: "Christopher Nolan",
      image: "/placeholder.svg?height=600&width=400&text=Oppenheimer",
    },
    {
      title: "The Batman",
      rating: "8.5",
      genre: "Action",
      year: "2022",
      director: "Matt Reeves",
      image: "/placeholder.svg?height=600&width=400&text=The Batman",
    },
    {
      title: "Everything Everywhere",
      rating: "8.7",
      genre: "Sci-Fi",
      year: "2022",
      director: "Daniels",
      image: "/placeholder.svg?height=600&width=400&text=Everything Everywhere",
    },
  ];

  // Feature cards data
  const featureCards = [
    {
      title: "Ratings & Reviews",
      description: "Rate and review your favorite movies and TV shows. See what critics and other users think.",
      icon: <Star className="h-6 w-6" />,
      gradient: "from-amber-500 to-orange-600",
      hoverGradient: "group-hover:from-amber-600 group-hover:to-orange-700",
      delay: 0,
    },
    {
      title: "Watchlist",
      description: "Keep track of what you want to watch with personalized watchlists and recommendations.",
      icon: <Clock className="h-6 w-6" />,
      gradient: "from-blue-500 to-cyan-600",
      hoverGradient: "group-hover:from-blue-600 group-hover:to-cyan-700",
      delay: 1,
    },
    {
      title: "Awards & Events",
      description: "Stay updated with the latest award shows, film festivals, and industry events.",
      icon: <Award className="h-6 w-6" />,
      gradient: "from-purple-500 to-pink-600",
      hoverGradient: "group-hover:from-purple-600 group-hover:to-pink-700",
      delay: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation - This assumes your main layout.tsx handles the primary navigation.
          If this page.tsx is meant to have its own distinct header,
          ensure it doesn't conflict with the global nav from layout.tsx.
          The global nav from /workspaces/jetflix/app/layout.tsx will be present.
          If you want the landing page specific header from the original landingpage/app/page.tsx,
          you might need to conditionally render the global nav or adjust styling.
          For now, I'm including the header structure from the more feature-rich page.tsx
          that was in the root /app/page.tsx previously, assuming it's the desired one.
      */}
      {/*
        The global navigation is already provided by /workspaces/jetflix/app/layout.tsx.
        If you need a different navigation for *just this page*, you'd handle it here.
        Otherwise, remove any <header> or <nav> sections from this page.tsx
        if they duplicate the global navigation.

        The original /workspaces/jetflix/landingpage/app/page.tsx had a simple header:
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-4xl font-bold">Jetflix</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/signin" className="hover:text-indigo-400">Sign In</Link></li>
              <li><Link href="/signup" className="bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500">Sign Up</Link></li>
            </ul>
          </nav>
        </header>
        This conflicts with the global nav from layout.tsx. The global nav already has Sign In/Sign Up buttons
        via Clerk's <SignedOut> and <SignedIn> components.
        So, we should rely on the global navigation from layout.tsx and not include a separate header here.
      */}


      {/* Hero Section from the more feature-rich page.tsx */}
      <section className="relative pt-32 pb-32 md:pt-40 md:pb-40 overflow-hidden">
        {/* Background with cosmic effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background dark:from-background dark:via-purple-950/10 dark:to-background"></div>
          <div className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-[0.07] dark:opacity-[0.15]"></div>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.03] dark:opacity-20 bg-purple-500 dark:bg-blue-500"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div style={{ y: y1, opacity }} className="container px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              The Ultimate{" "}
              <motion.span
                className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Movie Database
              </motion.span>{" "}
              Experience
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Discover, rate, and discuss your favorite films and TV shows with the most comprehensive movie database
              platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-600 text-white"
                  asChild
                >
                  <Link href="/dashboard">
                    Start Exploring
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-border text-foreground">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Trailer
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Feature Cards */}
        <div className="container px-4 relative z-10 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={featureCardVariants}
                className={`group p-8 rounded-2xl shadow-lg backdrop-blur-sm bg-background/50 dark:bg-background/30 border border-border/50 relative overflow-hidden`}
              >
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br opacity-[0.03] dark:opacity-10 transition-opacity duration-300 group-hover:opacity-[0.06] dark:group-hover:opacity-20 ${card.gradient} ${card.hoverGradient}`}></div>
                <div
                  className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${card.gradient} ${card.hoverGradient} text-white transition-all duration-300 group-hover:scale-110`}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-muted-foreground">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <motion.section
        ref={trendingRef}
        initial="hidden"
        animate={trendingInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-32 mt-20 relative" // Adjusted mt-20, was py-32 before
      >
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Now</h2>
              <p className="text-muted-foreground max-w-2xl">
                Stay up to date with the most popular movies and TV shows this week.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="mt-4 md:mt-0" asChild>
                <Link href="/dashboard">
                  View All <TrendingUp className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMovies.map((movie, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={movieCardVariants}
                whileHover="hover"
                className="group relative rounded-xl overflow-hidden bg-card"
              >
                <div className="aspect-[2/3] overflow-hidden">
                  <Image // Assuming Image component is available and configured
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    width={400}
                    height={600}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="font-bold text-xl text-white mb-1">{movie.title}</h3>
                    <p className="text-white/80 text-sm mb-2">
                      {movie.year} • {movie.director}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-white/90 font-medium">{movie.rating}/10</span>
                      </div>
                      <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">{movie.genre}</span>
                    </div>
                    <Button className="mt-4 w-full bg-white/90 text-black hover:bg-white">
                      <Play className="mr-2 h-4 w-4" /> Watch Trailer
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-foreground truncate">{movie.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-xs text-muted-foreground">{movie.rating}/10</span>
                    </div>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{movie.genre}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background dark:from-background dark:via-purple-950/5 dark:to-background"></div>
          <div className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-[0.07] dark:opacity-[0.15]"></div>
        </div>

        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm p-8 md:p-12">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10"></div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="flex-1">
                  <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
                    Create Your Free Account Today
                  </motion.h2>
                  <motion.p variants={fadeIn} className="text-muted-foreground mb-6">
                    Join thousands of movie enthusiasts on Jetflix. Create watchlists, rate movies, and get personalized
                    recommendations.
                  </motion.p>
                  <motion.div
                    variants={fadeIn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-600 text-white"
                      asChild
                    >
                      <Link href="/sign-up">Sign Up Now</Link>
                    </Button>
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  className="flex-1 max-w-[300px]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={ctaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-30 dark:opacity-50 animate-pulse"></div>
                    <div className="relative bg-card rounded-xl overflow-hidden shadow-xl">
                      <div className="p-4 border-b border-border/50">
                        <h3 className="font-medium">Free Account Benefits</h3>
                      </div>
                      <div className="p-4 space-y-3">
                        {[
                          "Personalized Recommendations",
                          "Create & Share Watchlists",
                          "Rate & Review Movies",
                          "Track Viewing History",
                        ].map((benefit, i) => (
                          <motion.div
                            key={benefit}
                            initial={{ opacity: 0, x: -10 }}
                            animate={ctaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                            <span className="text-sm">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer - This assumes your main layout.tsx handles the primary footer or you want this specific footer.
          The global /workspaces/jetflix/components/footer.tsx might be different.
          Adjust if this footer is duplicative or if the global one is preferred.
      */}
      <footer className="border-t border-border py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 md:mb-0"
            >
              <Link href="/" className="flex items-center gap-2">
                <div className="relative w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 rounded-md flex items-center justify-center">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">Jetflix</span>
              </Link>
              <p className="text-muted-foreground mt-4 max-w-xs">
                The ultimate platform for movie enthusiasts to discover, rate, and discuss films and TV shows.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Explore",
                  links: ["Movies", "TV Shows", "Top Rated", "Coming Soon"],
                },
                {
                  title: "Company",
                  links: ["About", "Careers", "Press", "Contact"],
                },
                {
                  title: "Legal",
                  links: ["Terms", "Privacy", "Cookies", "Licenses"],
                },
              ].map((group, i) => (
                <div key={group.title}>
                  <h3 className="font-medium mb-4 text-sm">{group.title}</h3>
                  <ul className="space-y-2">
                    {group.links.map((item, j) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 + j * 0.05 }}
                      >
                        <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                          {item}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Jetflix. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Twitter", "GitHub", "Discord", "Instagram"].map((social, i) => (
                <motion.div
                  key={social}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                    {social}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}