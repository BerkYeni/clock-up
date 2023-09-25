import { expect, test } from "vitest";
import { HourWindow } from "../interfaces";
import { isValidHourWindows } from "../utilities";

test("isValidHourWindows()", () => {
  const windowA: HourWindow = {
    start: { hours: 10, minutes: 0 },
    end: { hours: 11, minutes: 30 },
  };

  expect(isValidHourWindows([windowA])).toBe(true);

  const windowB: HourWindow = {
    start: { hours: 14, minutes: 30 },
    end: { hours: 17, minutes: 0 },
  };

  expect(isValidHourWindows([windowA, windowB])).toBe(true);

  const windowC: HourWindow = {
    start: { hours: 11, minutes: 0 },
    end: { hours: 15, minutes: 0 },
  };

  expect(isValidHourWindows([windowA, windowC])).toBe(false);

  const windowD: HourWindow = {
    start: { hours: 22, minutes: 0 },
    end: { hours: 1, minutes: 0 },
  };

  expect(isValidHourWindows([windowA, windowD])).toBe(true);

  const windowE: HourWindow = {
    start: { hours: 21, minutes: 0 },
    end: { hours: 23, minutes: 0 },
  };

  expect(isValidHourWindows([windowD, windowE])).toBe(false);

  const windowF: HourWindow = {
    start: { hours: 21, minutes: 0 },
    end: { hours: 2, minutes: 0 },
  };

  expect(isValidHourWindows([windowD, windowF])).toBe(false);

  const windowG: HourWindow = {
    start: { hours: 0, minutes: 30 },
    end: { hours: 2, minutes: 0 },
  };

  expect(isValidHourWindows([windowD, windowG])).toBe(false);
});
