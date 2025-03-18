import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { VT323 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InfoTech Event - The Future Awaits",
  description: "A special guest is coming. Prepare for a revolutionary tech event by InfoTech.",
  keywords: ["InfoTech", "event", "technology", "future", "tech", "guest"],
  authors: [{ name: "InfoTech University Club" }],
  openGraph: {
    title: "InfoTech Event - The Future Awaits",
    description: "A special guest is coming. Prepare for a revolutionary tech event by InfoTech.",
    url: "https://infotech-event.vercel.app",
    siteName: "InfoTech Event",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "InfoTech Event Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InfoTech Event - The Future Awaits",
    description: "A special guest is coming. Prepare for a revolutionary tech event by InfoTech.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vt323.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
