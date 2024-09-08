import { BlogPosts } from "@/components/posts";

export const metadata = {
  title: "Log",
  description: "Read logs.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">{`Logs`}</h1>
      <BlogPosts />
    </section>
  );
}
