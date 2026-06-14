import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/contexts/QueryProvider";

import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://auraweds.com"),
  title: {
    default: "Aura Weds — Find the relationship that lasts a lifetime",
    template: "%s · Aura Weds",
  },
  description:
    "Aura Weds is a premium Indian matrimonial platform built on verified profiles, family-assisted matchmaking, and privacy-first connections for meaningful, lifelong relationships.",
  applicationName: "Aura Weds",
  keywords: [
    "matrimony",
    "Indian matrimony",
    "verified profiles",
    "family matchmaking",
    "premium matrimonial",
    "marriage",
    "AuraWeds",
  ],
  authors: [{ name: "Aura Weds" }],
  category: "lifestyle",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://auraweds.com",
    siteName: "Aura Weds",
    title: "Aura Weds — Find the relationship that lasts a lifetime",
    description:
      "Verified profiles, family-assisted matching, and privacy-first connections. The premium way to find a lifelong partner.",
    images: [
      {
        url: "/auraWedsLogo.png",
        width: 1200,
        height: 630,
        alt: "Aura Weds — Premium Indian Matrimony",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura Weds — Find the relationship that lasts a lifetime",
    description:
      "Verified profiles, family-assisted matching, and privacy-first connections.",
    images: ["/auraWedsLogo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#4c1d95",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${outfit.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <Toaster
            position="top-right"
            containerStyle={{ zIndex: 999999 }}
            toastOptions={{
              duration: 4000,
              style: {
                background: "#0f172a",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "1rem",
                fontSize: "13px",
                fontWeight: "600",
                boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.5)",
              },
            }}
          />
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
