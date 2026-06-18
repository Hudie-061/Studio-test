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
  title: "Studio — AI Cinematic Brand Films · Brussels",
  description:
    "A directing studio combining AI tools with cinematic craft. We help brands deliver presence that feels considered, intentional, and unmistakably premium.",
  openGraph: {
    title: "Studio — AI Cinematic Brand Films · Brussels",
    description:
      "A directing studio combining AI tools with cinematic craft.",
    type: "website",
  },
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
