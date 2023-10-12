import { FormType } from "@/routes/CreateSchedule";
import {
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
  UseFormReturn,
} from "react-hook-form";
import { Button } from "./ui/button";
import { FormItem, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

type Props = {
  field: ControllerRenderProps<FormType, "hourWindowModule">;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FormType>;
} & {
  form: UseFormReturn<FormType, any, undefined>;
};

const AddHourWindowField = (props: Props) => {
  const { field } = props;
  return (
    <FormItem>
      <div className="flex">
        <FormControl>
          <Input
            type="number"
            step={1}
            // min={0}
            // max={23}
            value={field.value.hourWindowInput.start.hours}
            onChange={(event) =>
              field.onChange({
                ...field.value,
                hourWindowInput: {
                  ...field.value.hourWindowInput,
                  start: {
                    ...field.value.hourWindowInput.start,
                    hours: event.target.value,
                  },
                },
              })
            }
          />
        </FormControl>
        <FormMessage />
        <FormControl>
          <Input
            className="mr-1"
            type="number"
            step={1}
            min={0}
            max={59}
            value={field.value.hourWindowInput.start.minutes}
            onChange={(event) =>
              field.onChange({
                ...field.value,
                hourWindowInput: {
                  ...field.value.hourWindowInput,
                  start: {
                    ...field.value.hourWindowInput.start,
                    minutes: event.target.value,
                  },
                },
              })
            }
          />
        </FormControl>
        <FormControl>
          <Input
            className="ml-1"
            type="number"
            step={1}
            min={0}
            max={23}
            value={field.value.hourWindowInput.end.hours}
            onChange={(event) =>
              field.onChange({
                ...field.value,
                hourWindowInput: {
                  ...field.value.hourWindowInput,
                  end: {
                    ...field.value.hourWindowInput.end,
                    hours: event.target.value,
                  },
                },
              })
            }
          />
        </FormControl>
        <FormControl>
          <Input
            type="number"
            step={1}
            min={0}
            max={59}
            value={field.value.hourWindowInput.end.minutes}
            onChange={(event) =>
              field.onChange({
                ...field.value,
                hourWindowInput: {
                  ...field.value.hourWindowInput,
                  end: {
                    ...field.value.hourWindowInput.end,
                    minutes: event.target.value,
                  },
                },
              })
            }
          />
        </FormControl>
      </div>
      <div className="flex justify-end">
        <FormControl>
          <Button
            onClick={(event) => {
              event.preventDefault();
              const biggestId = field.value.hourWindows.length
                ? Math.max(
                    ...field.value.hourWindows.map((window) => window.id)
                  )
                : -1;
              const newWindow = {
                id: biggestId + 1,
                hourWindowsValue: {
                  start: {
                    hours: field.value.hourWindowInput.start.hours,
                    minutes: field.value.hourWindowInput.start.minutes,
                  },
                  end: {
                    hours: field.value.hourWindowInput.end.hours,
                    minutes: field.value.hourWindowInput.end.minutes,
                  },
                },
              };
              field.onChange({
                ...field.value,
                hourWindows: [...field.value.hourWindows, newWindow],
              });
            }}
          >
            Add Window
          </Button>
        </FormControl>
        <FormMessage />
      </div>
    </FormItem>
  );
};

export default AddHourWindowField;
