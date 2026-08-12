import Image, { type ImageProps } from "next/image";

// 672px is the `max-w-2xl` post column.
const SIZES = "(max-width: 768px) 100vw, 672px";

export function PostImage(props: ImageProps) {
  return <Image sizes={SIZES} className="w-full h-auto" {...props} />;
}
