import { BlogPosts } from "@/components/posts";

export default function Page() {
  return (
    <section>
      <div className="mb-8 flex items-center gap-2">
        <h1
          className="text-2xl font-semibold tracking-tighter outline-offset-4 outline-gray-400"
          contentEditable
        >
          $ {`Hello!, I'm Sandev`}
        </h1>
        <span className="text-sm  animate-blink text-slate-600 select-none">
          ▌
        </span>
      </div>
      <p className="mb-4">{`I build cool things for the web and am always open to new, exciting challenges.`}</p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
