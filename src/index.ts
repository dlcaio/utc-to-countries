import { readMapFromFile } from "./utils/file";
import { parseOffset, formatOffset } from "./utils/offset";
import type { UTCCountries, TZ } from "./types";
import { tz } from "./types";

export function getCountries(tz: string): Record<string, string> {
  const map: UTCCountries = readMapFromFile("map.json");
  return map[tz];
}

export function getCountriesBetween(
  startOffset: TZ,
  endOffset: TZ
): Record<string, string> {
  if (tz.safeParse(startOffset).error || tz.safeParse(endOffset).error) {
    throw new Error("invalid input");
  }

  const map: UTCCountries = readMapFromFile("map.json");
  const startMinutes = parseOffset(startOffset);
  const endMinutes = parseOffset(endOffset);
  const step = 15;

  const stepDirection = startMinutes < endMinutes ? 1 : -1;
  let result: Record<string, string> = {};

  for (
    let currentMinutes = startMinutes;
    stepDirection * currentMinutes <= stepDirection * endMinutes;
    currentMinutes += step * stepDirection
  ) {
    const currentOffset = formatOffset(currentMinutes);
    if (map[currentOffset]) {
      result = { ...result, ...map[currentOffset] };
    }
  }

  return result;
}