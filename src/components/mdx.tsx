/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";

function Table({ data }: any) {
  const headers = data.headers.map((header: any, index: number) => (
    <th key={index}>{header}</th>
  ));

  const rows = data.rows.map((row: any, index: number) => (
    <tr key={index}>
      {row.map((cell: any, cellIndex: any) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: any) {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

// 672px is the `max-w-2xl` post column.
const IMAGE_SIZES = "(max-width: 768px) 100vw, 672px";

function MdxImage({ src, alt = "" }: { src: string; alt?: string }) {
  if (!src.startsWith("/")) {
    // Optimising a remote image would need a `remotePatterns` entry.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      // Markdown carries no dimensions and `next/image` only infers them from a
      // static import, which the runtime MDX pipeline can't produce. Nominal
      // width, unreserved height: costs layout shift, buys srcset and lazyload.
      width={1344}
      height={0}
      sizes={IMAGE_SIZES}
      style={{ width: "100%", height: "auto" }}
      loading="eager"
    />
  );
}

function Code({ children, ...props }: any) {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Tag = `h${level}` as any;
  const Heading = ({ children }: any) => {
    const slug = slugify(children);
    return (
      <Tag id={slug}>
        <a href={`#${slug}`} className="anchor no-underline font-semibold">
          {children}
        </a>
      </Tag>
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  img: MdxImage,
  a: CustomLink,
  code: Code,
  Table,
};

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
