import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";

type Props = {};

const AddHourWindowSchema = z.object({
  start: z.object({
    hours: z.number().min(0, { message: "testing awooga" }).max(23),
    minutes: z.number().min(0).max(59),
  }),
  end: z.object({
    hours: z.number().min(0, { message: "testing awooga" }).max(23),
    minutes: z.number().min(0).max(59),
  }),
});

const AddHourWindow = (props: Props) => {
  const addHourWindowForm = useForm<z.infer<typeof AddHourWindowSchema>>({
    resolver: zodResolver(AddHourWindowSchema),
    defaultValues: {
      start: { hours: 10, minutes: 0 },
      end: { hours: 14, minutes: 0 },
    },
  });

  const fieldValues = addHourWindowForm.getValues();
  const fields = [
    {
      name: "start",
      values: [
        { key: 0, value: fieldValues.start.hours },
        { key: 1, value: fieldValues.start.minutes },
      ],
    },
    {
      name: "end",
      values: [
        { key: 2, value: fieldValues.end.hours },
        { key: 3, value: fieldValues.end.minutes },
      ],
    },
  ];

  return (
    <div>
      {fields.map((end) =>
        end.values.map((field) => (
          <FormField
            name={end.name}
            render={(props) => (
              <FormItem key={field.key}>
                <FormControl>
                  <Input
                    type="number"
                    step={1}
                    // min={0}
                    // max={23}
                    value={field.value}
                    // TODO: impl
                    // onChange={(event) => }
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))
      )}
    </div>
  );

  // <FormItem>
  //   <div className="flex">
  //     <FormControl>
  //       <Input
  //         type="number"
  //         step={1}
  //         // min={0}
  //         // max={23}
  //         value={field.value.hourWindowInput.start.hours}
  //         onChange={(event) =>
  //           field.onChange({
  //             ...field.value,
  //             hourWindowInput: {
  //               ...field.value.hourWindowInput,
  //               start: {
  //                 ...field.value.hourWindowInput.start,
  //                 hours: event.target.value,
  //               },
  //             },
  //           })
  //         }
  //       />
  //     </FormControl>
  //     <FormMessage />
  //     <FormControl>
  //       <Input
  //         className="mr-1"
  //         type="number"
  //         step={1}
  //         min={0}
  //         max={59}
  //         value={field.value.hourWindowInput.start.minutes}
  //         onChange={(event) =>
  //           field.onChange({
  //             ...field.value,
  //             hourWindowInput: {
  //               ...field.value.hourWindowInput,
  //               start: {
  //                 ...field.value.hourWindowInput.start,
  //                 minutes: event.target.value,
  //               },
  //             },
  //           })
  //         }
  //       />
  //     </FormControl>
  //     <FormControl>
  //       <Input
  //         className="ml-1"
  //         type="number"
  //         step={1}
  //         min={0}
  //         max={23}
  //         value={field.value.hourWindowInput.end.hours}
  //         onChange={(event) =>
  //           field.onChange({
  //             ...field.value,
  //             hourWindowInput: {
  //               ...field.value.hourWindowInput,
  //               end: {
  //                 ...field.value.hourWindowInput.end,
  //                 hours: event.target.value,
  //               },
  //             },
  //           })
  //         }
  //       />
  //     </FormControl>
  //     <FormControl>
  //       <Input
  //         type="number"
  //         step={1}
  //         min={0}
  //         max={59}
  //         value={field.value.hourWindowInput.end.minutes}
  //         onChange={(event) =>
  //           field.onChange({
  //             ...field.value,
  //             hourWindowInput: {
  //               ...field.value.hourWindowInput,
  //               end: {
  //                 ...field.value.hourWindowInput.end,
  //                 minutes: event.target.value,
  //               },
  //             },
  //           })
  //         }
  //       />
  //     </FormControl>
  //   </div>
  //   <div className="flex justify-end">
  //     <FormControl>
  //       <Button
  //         onClick={(event) => {
  //           event.preventDefault();
  //           const biggestId = field.value.hourWindows.length
  //             ? Math.max(
  //                 ...field.value.hourWindows.map((window) => window.id)
  //               )
  //             : -1;
  //           const newWindow = {
  //             id: biggestId + 1,
  //             hourWindowsValue: {
  //               start: {
  //                 hours: field.value.hourWindowInput.start.hours,
  //                 minutes: field.value.hourWindowInput.start.minutes,
  //               },
  //               end: {
  //                 hours: field.value.hourWindowInput.end.hours,
  //                 minutes: field.value.hourWindowInput.end.minutes,
  //               },
  //             },
  //           };
  //           field.onChange({
  //             ...field.value,
  //             hourWindows: [...field.value.hourWindows, newWindow],
  //           });
  //         }}
  //       >
  //         Add Window
  //       </Button>
  //     </FormControl>
  //     <FormMessage />
  //   </div>
  // </FormItem>
};

export default AddHourWindow;
