import { Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";

import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { baseUrl, copy, pageMetadata, routes } from "@/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  ...pageMetadata({ ...copy.home, path: routes.home }),
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
        className={`${robotoMono.className} antialiased min-h-[100vh] max-w-2xl pt-4 sm:border-r`}
      >
        <main className="flex-auto min-w-0 flex flex-col">
          <Header />
          <div className="px-4">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
