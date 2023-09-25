export type HourAndMinute = {
  hours: number; // between 0 - 23
  minutes: number; // between 0 - 59
};

export type HourWindow = {
  // this is the time frame between
  // two 'smaller' and 'bigger' times of day
  start: HourAndMinute;
  end: HourAndMinute;
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

export type WeekFrame = { [key in keyof typeof Weekdays]: boolean };

export type TimeFrames = {
  hourWindows: HourWindow[];
  weekFrames: WeekFrame;
};

export type Schedule = {
  creationTime: number;
  name: string;
  notes: string;
  id: string;
  timeFrames: TimeFrames;
};
