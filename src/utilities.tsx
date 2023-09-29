import { HourAndMinute, HourWindow, TimeFrames } from "./interfaces";

export const combinations = <Type,>(
  items: Type[]
): readonly (readonly [Type, Type])[] => {
  const result = [];
  for (let i = 0; i < items.length - 1; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const pair: readonly [Type, Type] = [items[i], items[j]];
      result.push(pair);
    }
  }
  return result;
};

export const toMinutes = (hourAndMinute: HourAndMinute): number =>
  hourAndMinute.hours * 60 + hourAndMinute.minutes;

export const toHourAndMinute = (minutes: number): HourAndMinute => ({
  hours: Math.floor(minutes / 60),
  minutes: minutes % 60,
});

export const toStringHourAndMinute = (hourAndMinute: HourAndMinute): string =>
  `${hourAndMinute.hours < 10 ? "0" : ""}${hourAndMinute.hours}:${
    hourAndMinute.minutes < 10 ? "0" : ""
  }${hourAndMinute.minutes}`;

export const isThroughMidnight = (hourWindow: HourWindow): boolean =>
  toMinutes(hourWindow.start) > toMinutes(hourWindow.end);

export const isValidHourAndMinute = (hourAndMinute: HourAndMinute): boolean =>
  [
    hourAndMinute.hours >= 0,
    hourAndMinute.hours <= 23,
    hourAndMinute.minutes >= 0,
    hourAndMinute.minutes <= 59,
  ].every(Boolean);

const shallowEqual = <Type extends object>(obj1: Type, obj2: Type) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  (Object.keys(obj1) as (keyof typeof obj1)[]).every(
    (key) =>
      Object.prototype.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key]
  );

export const isValidHourWindow = (hourWindow: HourWindow): boolean => {
  const checkList = [
    isValidHourAndMinute(hourWindow.start),
    isValidHourAndMinute(hourWindow.end),
    !shallowEqual(hourWindow.start, hourWindow.end),
  ];
  return checkList.every(Boolean);
};

export const isValidHourWindows = (hourWindows: HourWindow[]): boolean =>
  hourWindows.every(isValidHourWindow) &&
  combinations(hourWindows).every((windowPair) => {
    const [earlier, later] =
      toMinutes(windowPair[0].start) < toMinutes(windowPair[1].start)
        ? [windowPair[0], windowPair[1]]
        : [windowPair[1], windowPair[0]];

    if (toMinutes(earlier.end) >= toMinutes(later.start)) {
      return false;
    }

    if (isThroughMidnight(earlier)) {
      return false;
    }

    if (isThroughMidnight(later)) {
      return toMinutes(later.end) < toMinutes(earlier.start);
    }

    return true;
  });

export const isValidTimeFrames = (timeFrame: TimeFrames): boolean => {
  return [isValidHourWindows(timeFrame.hourWindows)].every(Boolean);
};
