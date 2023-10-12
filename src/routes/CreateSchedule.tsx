import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { FC, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import {
  isValidHourWindows,
  toHourAndMinute,
  toStringHourAndMinute,
} from "@/utilities";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import ScheduleNameField from "@/components/ScheduleNameField";
import WeekdaysField from "@/components/WeekdaysField";
import HourWindowsField from "@/components/HourWindowsField";
// import { Slider } from "@radix-ui/react-slider";

// TODO: look into toast

// TODO: write error messages for hour window input and display them when
// Add Wondow button is pressed, not when Create Schedule button is pressed.
const hourSchema = z.number().min(0, { message: "testing awooga" }).max(23);
const minuteSchema = z.number().min(0).max(59);
const hourAndMinuteSchema = z.object({
  hours: hourSchema,
  minutes: minuteSchema,
});
const hourWindowSchema = z.object({
  start: hourAndMinuteSchema,
  end: hourAndMinuteSchema,
});

const FormSchema = z
  .object({
    scheduleName: z.string().min(1, {
      message: "Schedule Name must be at least 1 characters.",
    }),
    week: z.array(z.string()).refine((value) => value.some(Boolean)),
    hourWindowModule: z.object({
      hourWindowInput: hourWindowSchema,
      hourWindows: z
        .object({
          id: z.number(),
          hourWindowsValue: hourWindowSchema,
        })
        .array()
        .nonempty({ message: "There has to be at least 1 hour window." }),
    }),
  })
  .refine(
    (schema) =>
      isValidHourWindows(
        schema.hourWindowModule.hourWindows.map(
          (window) => window.hourWindowsValue
        )
      ),
    { message: "Hour windows must not collide.", path: ["hourWindowModule"] }
  );

export type FormType = z.infer<typeof FormSchema>;

const CreateSchedule: FC = () => {
  // export function CreateSchedule() {
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      scheduleName: "",
      week: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      hourWindowModule: {
        hourWindowInput: {
          start: { hours: 13, minutes: 0 },
          end: { hours: 17, minutes: 0 },
        },
        hourWindows: [
          {
            hourWindowsValue: {
              start: { hours: 9, minutes: 0 },
              end: { hours: 12, minutes: 0 },
            },
            id: 0,
          },
        ],
      },
    },
  });

  // TODO: delete this when debugging is over.
  useEffect(() => {
    console.log(form);
  }, [form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="p-2 mx-2 bg-zinc-200 rounded-md ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="scheduleName"
              render={ScheduleNameField}
            />

            <FormField
              name="week"
              control={form.control}
              render={(props) => <WeekdaysField {...props} form={form} />}
            />

            <FormField
              name="hourWindowModule"
              control={form.control}
              render={(props) => <HourWindowsField {...props} form={form} />}
            />

            <div className="flex justify-end">
              <Button type="submit">Create Schedule</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateSchedule;
