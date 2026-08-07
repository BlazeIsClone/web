import { buildFeed } from "@/app/feeds";

export async function GET() {
  return new Response(buildFeed().json1(), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
    },
  });
}
