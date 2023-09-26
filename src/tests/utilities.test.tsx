import { expect, test } from "vitest";
import { isValidHourWindows } from "../utilities";

test("isValidHourWindows()", () => {
  // single
  expect(
    isValidHourWindows([
      {
        start: { hours: 13, minutes: 0 },
        end: { hours: 15, minutes: 0 },
      },
    ])
  ).toBe(true);

  // same time
  expect(
    isValidHourWindows([
      {
        start: { hours: 0, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 7, minutes: 0 },
        end: { hours: 7, minutes: 0 },
      },
    ])
  ).toBe(false);

  // triple
  expect(
    isValidHourWindows([
      {
        start: { hours: 10, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 13, minutes: 0 },
        end: { hours: 15, minutes: 0 },
      },
      {
        start: { hours: 17, minutes: 0 },
        end: { hours: 19, minutes: 0 },
      },
    ])
  ).toBe(true);

  expect(
    isValidHourWindows([
      {
        start: { hours: 10, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 11, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
      {
        start: { hours: 17, minutes: 0 },
        end: { hours: 19, minutes: 0 },
      },
    ])
  ).toBe(false);

  // all permutations of [
  //   { hours: 0, minutes: 0 },
  //   { hours: 6, minutes: 0 },
  //   { hours: 12, minutes: 0 },
  //   { hours: 18, minutes: 0 },
  // ]
  expect(
    isValidHourWindows([
      {
        start: { hours: 0, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
    ])
  ).toBe(true);

  expect(
    isValidHourWindows([
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
    ])
  ).toBe(true);

  expect(
    isValidHourWindows([
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
      {
        start: { hours: 0, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
    ])
  ).toBe(true);

  expect(
    isValidHourWindows([
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
    ])
  ).toBe(true);

  expect(
    isValidHourWindows([
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 0, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 0, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
      {
        start: { hours: 0, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
      {
        start: { hours: 0, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
      {
        start: { hours: 0, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 0, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 0, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 0, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 0, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 0, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
    ])
  ).toBe(false);

  // all permutations of [
  //   { hours: 23, minutes: 59 },
  //   { hours: 6, minutes: 0 },
  //   { hours: 12, minutes: 0 },
  //   { hours: 18, minutes: 0 },
  // ]
  expect(
    isValidHourWindows([
      {
        start: { hours: 23, minutes: 59 },
        end: { hours: 6, minutes: 0 },
      },
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
    ])
  ).toBe(true);

  expect(
    isValidHourWindows([
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 23, minutes: 59 },
      },
    ])
  ).toBe(true);

  expect(
    isValidHourWindows([
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 23, minutes: 59 },
      },
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
    ])
  ).toBe(true);

  expect(
    isValidHourWindows([
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
      {
        start: { hours: 23, minutes: 59 },
        end: { hours: 6, minutes: 0 },
      },
    ])
  ).toBe(true);

  expect(
    isValidHourWindows([
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 23, minutes: 59 },
      },
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 23, minutes: 59 },
      },
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 23, minutes: 59 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 23, minutes: 59 },
        end: { hours: 18, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
      {
        start: { hours: 23, minutes: 59 },
        end: { hours: 18, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
      {
        start: { hours: 23, minutes: 59 },
        end: { hours: 12, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
      {
        start: { hours: 23, minutes: 59 },
        end: { hours: 12, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 23, minutes: 59 },
        end: { hours: 18, minutes: 0 },
      },
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 23, minutes: 59 },
      },
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 23, minutes: 59 },
        end: { hours: 6, minutes: 0 },
      },
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 23, minutes: 59 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 23, minutes: 59 },
      },
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 23, minutes: 59 },
      },
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 23, minutes: 59 },
        end: { hours: 18, minutes: 0 },
      },
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 23, minutes: 59 },
        end: { hours: 6, minutes: 0 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 12, minutes: 0 },
      },
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 23, minutes: 59 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 23, minutes: 59 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 6, minutes: 0 },
        end: { hours: 18, minutes: 0 },
      },
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 23, minutes: 59 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 23, minutes: 59 },
      },
    ])
  ).toBe(false);

  expect(
    isValidHourWindows([
      {
        start: { hours: 12, minutes: 0 },
        end: { hours: 6, minutes: 0 },
      },
      {
        start: { hours: 18, minutes: 0 },
        end: { hours: 23, minutes: 59 },
      },
    ])
  ).toBe(false);
});

function permute<Type>(permutation: Type[]): Type[][] {
  const length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0);
  let i = 1,
    k,
    p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}
