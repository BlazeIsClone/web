/**
 * Pinned to UTC: `new Date("2026-04-01T00:00:00Z")` renders as March on a
 * build machine in a negative-offset zone, and these strings are baked in at
 * build time.
 */
const monthFormat = (isoMonth: string, month: "long" | "short") =>
  new Date(`${isoMonth}-01T00:00:00Z`).toLocaleString("en-US", {
    month,
    year: "numeric",
    timeZone: "UTC",
  });

export const formatMonth = (isoMonth: string) => monthFormat(isoMonth, "long");

export const formatMonthShort = (isoMonth: string) =>
  monthFormat(isoMonth, "short");

/**
 * "Apr 2026 – Present" / "Jan 2022 – Mar 2026". No computed durations
 * ("1 yr 5 mos") anywhere - they would freeze at build time on a static page.
 */
export const formatRange = (startDate: string, endDate?: string) =>
  `${formatMonthShort(startDate)} – ${endDate ? formatMonthShort(endDate) : "Present"}`;
