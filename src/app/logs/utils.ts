import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  metaTitle?: string;
  publishedAt: string;
  updatedAt?: string;
  summary: string;
  image?: string;
  draft?: boolean;
};

function getPostDirs(dir: string) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function readMetadata(dir: string, slug: string): Metadata {
  const filePath = path.join(dir, slug, "metadata.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function getAllBlogPosts() {
  const dir = path.join(process.cwd(), "src", "app", "logs", "posts");

  return getPostDirs(dir).map((slug) => ({
    metadata: readMetadata(dir, slug),
    slug,
  }));
}

export function getBlogPosts() {
  return getAllBlogPosts().filter((post) => !post.metadata.draft);
}

/** Shared by the rendered listing and the homepage `ItemList` so the two can't drift. */
export function getRecentPosts(limit?: number) {
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  return limit ? posts.slice(0, limit) : posts;
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
