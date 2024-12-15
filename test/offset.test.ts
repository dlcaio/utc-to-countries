import { parseOffset, formatOffset } from "../src/utils/offset";

describe("offset utility functions", () => {
  describe("parseOffset", () => {
    it("should parse +08:00 correctly", () => {
      expect(parseOffset("+08:00")).toBe(480); // 8 * 60 minutes
    });

    it("should parse -05:00 correctly", () => {
      expect(parseOffset("-05:00")).toBe(-300); // -5 * 60 minutes
    });

    it("should handle +00:00 (UTC) correctly", () => {
      expect(parseOffset("+00:00")).toBe(0);
    });
  });

  describe("formatOffset", () => {
    it("should format 480 minutes as +08:00", () => {
      expect(formatOffset(480)).toBe("+08:00");
    });

    it("should format -300 minutes as -05:00", () => {
      expect(formatOffset(-300)).toBe("-05:00");
    });

    it("should format 0 minutes as +00:00 (UTC)", () => {
      expect(formatOffset(0)).toBe("+00:00");
    });
  });
});
