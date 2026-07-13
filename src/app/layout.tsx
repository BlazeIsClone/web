import { Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import type { Person, WithContext } from "schema-dts";

import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { baseUrl } from "@/app/sitemap";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sandev Abeykoon - Dev Log",
  description: "I build cool things for the web.",
};

const personSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sandev Abeykoon",
  jobTitle: "Full-Stack Engineer",
  description:
    "I build cool things for the web and I am always open to exciting challenges.",
  url: baseUrl,
  sameAs: [
    "https://github.com/BlazeIsClone",
    "mailto:sandevabeykoon123@gmail.com",
  ],
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <main className="flex-auto min-w-0 flex flex-col">
          <Header />
          <div className="px-4">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
