import type { Metadata } from "next";
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
  title: "AuraWeds Premium Matrimony",
  description:
    "A highly scalable, emotionally intelligent, and privacy-first marriage journey platform.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
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
