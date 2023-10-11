import { FormType } from "@/routes/CreateSchedule";
import { FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
} from "react-hook-form";

type Props = {
  field: ControllerRenderProps<FormType, "scheduleName">;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FormType>;
};

const ScheduleNameField = (props: Props) => {
  const { field } = props;
  return (
    <FormItem>
      <FormLabel>Schedule Name</FormLabel>
      <FormControl>
        <Input placeholder="Examples: Work, Study, Exercise..." {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default ScheduleNameField;
