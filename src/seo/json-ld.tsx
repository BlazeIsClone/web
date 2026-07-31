import type { Graph } from "schema-dts";

/** Renders a schema graph as JSON-LD. Pair with `graph()` from ./schema. */
export function JsonLd({ schema }: { schema: Graph }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
