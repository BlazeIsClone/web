import { BlogPosts } from "@/components/posts";

export const metadata = {
  title: "Sandev Abeykoon - Field Logs",
  description:
    "Insights, experiments, and stories to follow along with my journey",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-xl mb-8 tracking-tighter">{`/logs`}</h1>
      <BlogPosts />
    </section>
  );
}
