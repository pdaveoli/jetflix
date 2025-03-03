import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://clerk-next-app.vercel.app/"),
  title: "Jetflix",
  description:
    "Elevated entertainment experience with cutting-edge streaming technology.",
  openGraph: { images: ["/og.png"] },
};