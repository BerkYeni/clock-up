import { FormType } from "@/routes/CreateSchedule";
import { toStringHourAndMinute } from "@/utilities";
import { Separator } from "@radix-ui/react-separator";
import {
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
  UseFormReturn,
} from "react-hook-form";
import { Button } from "./ui/button";
import { FormItem, FormLabel, FormField, FormMessage } from "./ui/form";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  field: ControllerRenderProps<FormType, "hourWindowModule">;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FormType>;
} & {
  form: UseFormReturn<FormType, any, undefined>;
};

const RemoveHourWindowField = (props: Props) => {
  const { field, form } = props;
  return (
    <div className="mb-4">
      <FormItem>
        <FormLabel>Hour Windows</FormLabel>

        <ScrollArea className="overflow-y-auto w-full h-36 rounded-md border">
          <div className="p-4">
            {field.value.hourWindows.map((hourWindow) => (
              <div key={hourWindow.id}>
                <FormField
                  name="hourWindowModule"
                  control={form.control}
                  render={({ field }) => (
                    <div className="border-2 border-zinc-950 rounded-md">
                      <div className="flex w-full justify-between items-center">
                        {
                          `${toStringHourAndMinute(
                            hourWindow.hourWindowsValue.start
                          )} - ${toStringHourAndMinute(
                            hourWindow.hourWindowsValue.end
                          )}` // TODO: implement to string am pm
                        }

                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            field.onChange({
                              ...field.value,
                              hourWindows: field.value.hourWindows.filter(
                                (window) => window.id !== hourWindow.id
                              ),
                            });
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}
                />
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
        <FormMessage />
      </FormItem>
    </div>
  );
};

export default RemoveHourWindowField;
