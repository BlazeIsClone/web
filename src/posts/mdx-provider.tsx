/* eslint-disable @typescript-eslint/no-explicit-any */

import type { MDXComponents } from "mdx/types";
import Link from "next/link";
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
  a: CustomLink,
  code: Code,
  Table,
};

export function useMDXComponents(mdxComponents: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
