import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/og-image";
import { personJobTitle, siteName } from "@/seo";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = siteName;

export default async function Image() {
  return renderOgImage(siteName, personJobTitle);
}
