import { FormType } from "@/routes/CreateSchedule";
import {
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
  UseFormReturn,
} from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Checkbox } from "./ui/checkbox";

const week = [
  { id: "monday", day: "Monday" },
  { id: "tuesday", day: "Tuesday" },
  { id: "wednesday", day: "Wednesday" },
  { id: "thursday", day: "Thursday" },
  { id: "friday", day: "Friday" },
  { id: "saturday", day: "Saturday" },
  { id: "sunday", day: "Sunday" },
] as const;

type Props = {
  field: ControllerRenderProps<FormType, "week">;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FormType>;
} & {
  form: UseFormReturn<FormType, any, undefined>;
};

const WeekdaysField = (props: Props) => {
  return (
    <FormItem>
      <div className="mb-4">
        <FormLabel className="text-base">Weekdays</FormLabel>
      </div>
      {week.map((item) => (
        <FormField
          key={item.id}
          control={props.form.control}
          name="week"
          render={({ field }) => {
            return (
              <FormItem
                key={item.id}
                className="flex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item.id)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...field.value, item.id])
                        : field.onChange(
                            field.value?.filter((value) => value !== item.id)
                          );
                    }}
                  />
                </FormControl>
                <FormLabel className="font-normal">{item.day}</FormLabel>
              </FormItem>
            );
          }}
        />
      ))}
      <FormMessage />
    </FormItem>
  );
};

export default WeekdaysField;
