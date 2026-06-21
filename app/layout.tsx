import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/shared/SmoothScrollProvider";
import CustomCursor from "@/components/shared/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vantir.studio"),
  title: {
    default: "VANTIR Studio",
    template: "%s · VANTIR Studio",
  },
  description:
    "Cinematic brand films and editorial websites for businesses who refuse to look ordinary. Brussels.",
  openGraph: {
    title: "VANTIR Studio",
    description:
      "Cinematic brand films and editorial websites for businesses who refuse to look ordinary. Brussels.",
    url: "https://vantir.studio",
    siteName: "VANTIR Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VANTIR Studio",
    description:
      "Cinematic brand films and editorial websites for businesses who refuse to look ordinary. Brussels.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${newsreader.variable}`}>
      <body>
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
