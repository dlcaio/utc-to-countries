import { getTimeZones } from "@vvo/tzdb";
import { writeMapToFile } from "./file";
import type { UTCCountries } from "../types";

const timeZonesWithUtc = getTimeZones({ includeUtc: true });

export function buildTimeZoneMap(): void {
  const map: UTCCountries = {};

  timeZonesWithUtc.forEach((tz) => {
    const utc = tz.rawFormat.split(" ")[0];

    if (tz.countryName) {
      if (utc in map) {
        map[utc][tz.countryCode] = tz.countryName;
      } else {
        map[utc] = { [tz.countryCode]: tz.countryName };
      }
    }
  });

  writeMapToFile("map.json", map);
  return;
}
