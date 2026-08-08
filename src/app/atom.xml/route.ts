import { buildFeed } from "@/app/feeds";

export async function GET() {
  return new Response(buildFeed().atom1(), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
