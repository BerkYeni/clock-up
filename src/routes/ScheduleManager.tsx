import { FC } from "react";
import { Link } from "react-router-dom";

type Timing = string;

type Schedule = {
  name: string;
  id: string;
  timing: Timing;
};

const schedules: Schedule[] = [
  { id: "0", name: "testing", timing: "awooga" },
  { id: "1", name: "fdsaf", timing: "fdsafdsa" },
];

// type ManageScheduleProps = {
//   schedule: Schedule;
// };

// const ManageSchedule: FC<ManageScheduleProps> = (props) => {
//   const { schedule } = props;
//   return (
//     <div>
//       <div>{schedule.name}</div>
//     </div>
//   );
// };

// TODO: consider changing margins to paddings

const ScheduleList: FC<{ schedules: Schedule[] }> = (props) => {
  return props.schedules.map((schedule) => (
    <div className="p-2 mx-2 my-4 bg-zinc-200 rounded-md" key={schedule.id}>
      <div>{schedule.name}</div>
      <div>{schedule.timing}</div>
      <div className="flex justify-around">
        <button className=" p-1 basis-1/4 bg-red-400 rounded-md">Delete</button>
        <button className="p-1 basis-1/4 bg-yellow-200 rounded-md">Edit</button>
      </div>
    </div>
  ));
};

const ScheduleManager: FC = () => {
  return (
    <div className="h-screen m-0">
      <div className="flex w-full justify-end">
        <Link to="/create">
          <button className="p-2 m-5 bg-green-500 text-zinc-100 rounded-md font-bold">
            Add Schedule
          </button>
        </Link>
      </div>

      <hr></hr>

      <ScheduleList schedules={schedules} />
    </div>
  );
};

export default ScheduleManager;
