import { BlogPosts } from "@/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        {`SpaceOps`}
      </h1>
      <p className="mb-4">
        {`A space exploration organization that executes space missions this includes rocket launches, intel gathering, space infrastructure building and maintenance, resource mining.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
