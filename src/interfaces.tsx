export type HourAndMinute = {
  hours: number; // between 0 - 23
  minutes: number; // between 0 - 59
};

export type HourFrames = {
  // this is the time frame between
  // two 'smaller' and 'bigger' times of day
  timeA: HourAndMinute;
  timeB: HourAndMinute;
};

export enum Weekdays {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export type WeekFrames = { [key in keyof typeof Weekdays]: boolean };

export type TimeFrames = {
  hourFrames: HourFrames[];
  weekFrames: WeekFrames;
};

export type Schedule = {
  creationTime: number;
  name: string;
  notes: string;
  id: string;
  timeFrames: TimeFrames;
};
