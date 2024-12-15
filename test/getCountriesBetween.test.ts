import { getCountriesBetween } from "../src";
import mockMap from "./mocks/map.json";

jest.mock("fs", () => ({
  readFileSync: jest.fn().mockImplementation(() => JSON.stringify(mockMap)),
}));

describe("getCountriesBetween", () => {
  it("should return an empty object for missing data in range", () => {
    const result = getCountriesBetween("-01:00", "+01:00");
    expect(result).toEqual({});
  });

  it("should throw an error for invalid offsets", () => {
    expect(() => getCountriesBetween("+25:00" as any, "+26:00" as any)).toThrow();
  });

  it("should throw an error for malformed offsets", () => {
    expect(() => getCountriesBetween("8:00" as any, "+09:00")).toThrow();
    expect(() => getCountriesBetween("+08:00", "900" as any)).toThrow();
  });

  it("should return countries between +08:00 and +09:00", () => {
    const result = getCountriesBetween("+08:00", "+09:00");
    expect(result).toEqual({
      CN: "China",
      PH: "Philippines",
      JP: "Japan",
      KR: "South Korea",
    });
  });

  it("should return countries in reverse range from +09:00 to +08:00", () => {
    const result = getCountriesBetween("+09:00", "+08:00");
    expect(result).toEqual({
      JP: "Japan",
      KR: "South Korea",
      CN: "China",
      PH: "Philippines",
    });
  });

  it("should return all countries from +08:00 to +10:00", () => {
    const result = getCountriesBetween("+08:00", "+10:00");
    expect(result).toEqual({
      CN: "China",
      PH: "Philippines",
      JP: "Japan",
      KR: "South Korea",
      AU: "Australia",
      PG: "Papua New Guinea",
    });
  });

  it("should handle cases where startOffset equals endOffset", () => {
    const result = getCountriesBetween("+08:00", "+08:00");
    expect(result).toEqual({
      CN: "China",
      PH: "Philippines",
    });
  });

  it("should handle small ranges (+09:00 to +09:00)", () => {
    const result = getCountriesBetween("+09:00", "+09:00");
    expect(result).toEqual({
      JP: "Japan",
      KR: "South Korea",
    });
  });
});
