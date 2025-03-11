import { BlogPosts } from "@/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Heyy I&apos;m Sandev
      </h1>
      <p className="mb-4">
        I specialize in automating and maintaining cloud based web apps, I also
        develop sleek websites. Lately, I’ve been hands on with building an
        on-prem server as part of my infrastructure journey.
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
