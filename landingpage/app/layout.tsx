import "../styles/reset.css"; // Using reset CSS instead of Tailwind
import { ThemeProvider } from "../components/theme-provider";
import { MotionProvider } from "../components/motion-provider";

export const metadata = {
  title: "Jetflix - The Ultimate Streaming Platform",
  description: "Find and discover movies and TV shows across all streaming platforms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <MotionProvider>
            {children}
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}