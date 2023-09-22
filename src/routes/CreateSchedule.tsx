import { FC } from "react";

const CreateSchedule: FC = () => {
  return (
    <div className="p-2 mx-2 bg-zinc-200 rounded-md">
      <h1>Create a new schedule</h1>
      <form action="">
        <label className="block" htmlFor="name">
          Name:
        </label>
        <input type="text" name="name" />
        <label className="block" htmlFor="timeFrames">
          Time Frames:
        </label>
        <input type="date" name="timeFrames" />
      </form>
    </div>
  );
};

export default CreateSchedule;
