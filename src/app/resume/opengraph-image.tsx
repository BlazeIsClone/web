import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/og-image";
import { copy, routes, siteName } from "@/seo";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = copy.resume.title;

export default async function Image() {
  return renderOgImage(routes.resume, siteName);
}
