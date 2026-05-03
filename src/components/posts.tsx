import Link from "next/link";
import { formatDate, getBlogPosts } from "@/app/logs/utils";

interface Props {
  maxPosts?: number;
}

export function BlogPosts({ maxPosts }: Props) {
  const allBlogs = getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .slice(0, maxPosts ?? allBlogs.length)
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/logs/${post.slug}`}
          >
            <div className="w-full flex space-x-2 text-md">
              <p className="tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="tracking-tight"> | {post.metadata.title}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
