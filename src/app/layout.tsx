import { Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import type { Person, WithContext } from "schema-dts";

import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { baseUrl } from "@/app/sitemap";

import "./globals.css";

const title = "Sandev Abeykoon - Dev Log";
const description = "I build cool things for the web.";
const ogImage = `${baseUrl}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: baseUrl,
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
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
