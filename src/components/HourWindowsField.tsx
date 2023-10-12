import { FormItem, FormLabel, FormField, FormMessage } from "./ui/form";
import { FormType } from "@/routes/CreateSchedule";
import {
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
  UseFormReturn,
} from "react-hook-form";
import AddHourWindowField from "./AddHourWindowField";
import RemoveHourWindowField from "./RemoveHourWindowField";

type Props = {
  field: ControllerRenderProps<FormType, "hourWindowModule">;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FormType>;
} & {
  form: UseFormReturn<FormType, any, undefined>;
};

const HourWindowsField = (props: Props) => {
  const { form } = props;
  return (
    <>
      <FormItem>
        <FormLabel>Time Frames</FormLabel>
        <FormField
          name="hourWindowModule"
          control={form.control}
          // TODO: swap this with materialui time picker android or static ver
          render={(props) => <AddHourWindowField {...props} form={form} />}
        />
      </FormItem>

      <FormItem>
        <FormField
          name="hourWindowModule"
          control={form.control}
          render={(props) => <RemoveHourWindowField {...props} form={form} />}
        />
        <FormMessage />
      </FormItem>
    </>
  );
};

export default HourWindowsField;
