import { baseUrl } from "@/app/sitemap";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        Allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
