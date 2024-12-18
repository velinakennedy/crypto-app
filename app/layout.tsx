import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";

const space = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoinTrade",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${space.className} bg-bg-light dark:bg-bg-dark transition-all duration-700 min-h-screen`}>
        <StoreProvider>
          <Navbar />
          <div className="xs:inline-block md:hidden">
            <MobileNav />
          </div>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
