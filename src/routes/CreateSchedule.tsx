import { FC } from "react";

const CreateSchedule: FC = () => {
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="p-2 mx-2 bg-zinc-200 rounded-md ">
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

          <div className="flex justify-end">
            <input
              className="block p-2 mt-5 bg-green-500 text-zinc-100 rounded-md font-bold"
              type="submit"
              value="Create Schedule"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSchedule;
