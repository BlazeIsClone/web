import { Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";

import { Header } from "@/components/header";
import Footer from "@/components/footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sandev Abeykoon - DevOps",
  description: "I build cool things for the web.",
};

const robotoMono = Roboto_Mono({
  weight: ["100", "400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.className} antialiased max-w-2xl mx-4 mt-8 lg:mx-auto`}
      >
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
