import { buildFeed } from "@/app/feeds";

export async function GET() {
  return new Response(buildFeed().rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
