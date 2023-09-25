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

export const isValidHourWindows = (hourWindows: HourWindow[]): boolean => {
  const hourCombinationPairs = combinations(hourWindows);
  return hourCombinationPairs.every((windowPair) => {
    const [earlier, later] =
      toMinutes(windowPair[0].start) < toMinutes(windowPair[1].start)
        ? [windowPair[0], windowPair[1]]
        : [windowPair[1], windowPair[0]];
    return toMinutes(earlier.end) < toMinutes(later.start);
  });
};

export const isValidTimeFrames = (timeFrame: TimeFrames): boolean => {
  return [isValidHourWindows(timeFrame.hourWindows)].every(
    (check) => check === true
  );
};
