import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };

export const ogImageContentType = "image/png";

/** Favicon doubles as the OG image logo, so it's read once and reused. */
const logoData = await readFile(join(process.cwd(), "src/app/favicon.ico"));
const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

export function renderOgImage(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "80px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={64} height={64} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#000000",
              lineHeight: 1.25,
            }}
          >
            {title}
          </span>
          <span
            style={{
              marginTop: 28,
              fontSize: 28,
              fontWeight: 500,
              color: "#000000",
            }}
          >
            {subtitle}
          </span>
        </div>
      </div>
    ),
    ogImageSize,
  );
}
