import { describe, expect, it } from "vitest";
import { bookingPeriod, currentBusinessKey, inputDate, inputTime, bookingsFromResponse, assertSuccessfulResponse } from "./bookingUtils";

describe("booking calendar fields", () => {
  const noonInMexico = new Date("2026-10-04T18:00:00Z");
  it("uses the separate hour to classify appointments later and earlier today", () => {
    expect(bookingPeriod({ fecha_cita: "2026-10-04T00:00:00.000Z", hora: "13:00" }, noonInMexico)).toBe("upcoming");
    expect(bookingPeriod({ fecha_cita: "2026-10-04", hora: "11:00" }, noonInMexico)).toBe("past");
    expect(bookingPeriod({ fecha_cita: "2026-10-04", hora: "12:00" }, noonInMexico)).toBe("upcoming");
  });
  it("uses the business day at midnight instead of the UTC calendar day", () => {
    expect(currentBusinessKey(new Date("2026-10-05T05:59:00Z"))).toBe("2026-10-04T23:59");
    expect(currentBusinessKey(new Date("2026-10-05T06:00:00Z"))).toBe("2026-10-05T00:00");
    expect(bookingPeriod({ fecha_cita: "2026-10-04", hora: "23:59" }, new Date("2026-10-05T06:00:00Z"))).toBe("past");
  });
  it("does not shift legacy ISO calendar dates and leaves malformed schedules unclassified", () => {
    expect(inputDate("2026-10-04T00:00:00Z")).toBe("2026-10-04");
    expect(inputDate("2026-02-30")).toBe("");
    expect(inputTime("25:00")).toBe("");
    expect(inputTime("09:30:00")).toBe("09:30");
    expect(bookingPeriod({ fecha_cita: "invalid", hora: "10:00" }, noonInMexico)).toBe("unknown");
  });
  it("distinguishes an empty API list from an unsupported response", () => {
    expect(bookingsFromResponse({ data: { citas: [] } }, "client")).toEqual([]);
    expect(() => bookingsFromResponse({ data: {} }, "client")).toThrow();
  });
  it("rejects an explicit API failure even with a successful HTTP code", () => {
    expect(() => assertSuccessfulResponse({ status: 200, data: { ok: false } })).toThrow();
    expect(() => assertSuccessfulResponse({ data: { ok: true } })).toThrow();
    expect(() => assertSuccessfulResponse({ status: 204 })).not.toThrow();
  });
});
