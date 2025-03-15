import { BlogPosts } from "@/components/posts";

export default function Page() {
  return (
    <section>
      <div className="mb-6 flex items-center gap-2">
        <h1
          className="text-xl font-semibold tracking-tighter outline-offset-4 outline-gray-400"
          contentEditable
        >
          $ {`Hello!, I'm Sandev Abeykoon`}
        </h1>
        <span className="text-sm  animate-blink text-slate-600 select-none">
          ▌
        </span>
      </div>
      <p className="mb-4 text-md">
        {`I build cool things for the web and I am always open to exciting challenges. Welcome to my field journal!`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
