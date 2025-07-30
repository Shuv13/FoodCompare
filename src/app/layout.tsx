import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodCompare - Compare Food Prices & Save Money",
  description: "Compare prices across Swiggy, Zomato, Uber Eats and more. Find the best deals on food delivery, quick delivery, and dining reservations.",
  keywords: ["FoodCompare", "food comparison", "Swiggy", "Zomato", "Uber Eats", "food delivery", "price comparison", "deals", "savings"],
  authors: [{ name: "FoodCompare Team" }],
  openGraph: {
    title: "FoodCompare - Compare Food Prices & Save Money",
    description: "Compare prices across multiple food platforms and find the best deals",
    url: "https://foodcompare.com",
    siteName: "FoodCompare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoodCompare - Compare Food Prices & Save Money",
    description: "Compare prices across multiple food platforms and find the best deals",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Navigation 
          user={{
            name: "John Doe",
            notifications: 3,
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
