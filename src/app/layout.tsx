import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { getCurrentUser } from "@/lib/auth";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kolkata Homes - Buy & Sell Properties in Kolkata",
  description: "Find your dream property in Kolkata. Browse apartments, houses, and plots for sale. List your property with verified brokers.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
         
          <main>{children}</main>
        </AuthProvider>
      </body>
      
    </html>
  );
}
