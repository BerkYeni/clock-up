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
import { HourAndMinute, HourWindow, Schedule } from "@/interfaces";
import { Checkbox } from "@/components/ui/checkbox";

import Testing from "../components/Testingdfsa";
import NewTestin from "@/components/NewTestingdfsa";
import { Slider } from "@/components/ui/slider";
import { SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider";
import { toHourAndMinute, toStringHourAndMinute } from "@/utilities";
import { render } from "react-dom";
// import { Slider } from "@radix-ui/react-slider";

// TODO: look into toast

const week = [
  { id: "monday", day: "Monday" },
  { id: "tuesday", day: "Tuesday" },
  { id: "wednesday", day: "Wednesday" },
  { id: "thursday", day: "Thursday" },
  { id: "friday", day: "Friday" },
  { id: "saturday", day: "Saturday" },
  { id: "sunday", day: "Sunday" },
] as const;

const FormSchema = z.object({
  scheduleName: z.string().min(1, {
    message: "Schedule Name must be at least 1 characters.",
  }),
  week: z.array(z.string()).refine((value) => value.some(Boolean)),
  hourWindowInput: z.object({
    start: z.object({ hours: z.number(), minutes: z.number() }),
    end: z.object({ hours: z.number(), minutes: z.number() }),
  }),
  hourWindows: z.array(
    z.object({
      id: z.number(),
      hourWindowsValue: z.object({
        start: z.object({ hours: z.number(), minutes: z.number() }),
        end: z.object({ hours: z.number(), minutes: z.number() }),
      }),
    })
  ),
});

const CreateSchedule: FC = () => {
  // export function CreateSchedule() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      scheduleName: "",
      week: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      hourWindowInput: {
        start: { hours: 1, minutes: 0 },
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
  });

  const [hourWindows, setHourWindows] = useState<HourWindow[]>([
    { start: { hours: 12, minutes: 0 }, end: { hours: 15, minutes: 0 } },
  ]);
  // const [test2, setTest2] = useState(500);
  const [start, setStart] = useState(hourWindows[0].start);
  const [end, setEnd] = useState(hourWindows[0].end);

  useEffect(() => {
    console.log(hourWindows);
  }, [hourWindows]);

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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Examples: Work, Study, Exercise..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="week"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Weekdays</FormLabel>
                  </div>
                  {week.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
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
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.day}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="hourWindowInput"
              control={form.control}
              render={() => {
                return (
                  <FormItem>
                    <FormLabel>Time Frames</FormLabel>
                    <FormField
                      name="hourWindowInput"
                      control={form.control}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <div className="flex">
                                <Input
                                  type="number"
                                  step={1}
                                  min={0}
                                  max={23}
                                  value={field.value.start.hours}
                                  onChange={(event) =>
                                    field.onChange({
                                      ...field.value,
                                      start: {
                                        ...field.value.start,
                                        hours: event.target.value,
                                      },
                                    })
                                  }
                                />
                                <Input
                                  type="number"
                                  step={1}
                                  min={0}
                                  max={59}
                                  value={field.value.start.minutes}
                                  onChange={(event) =>
                                    field.onChange({
                                      ...field.value,
                                      start: {
                                        ...field.value.start,
                                        minutes: event.target.value,
                                      },
                                    })
                                  }
                                />
                                <Input
                                  type="number"
                                  step={1}
                                  min={0}
                                  max={23}
                                  value={field.value.end.hours}
                                  onChange={(event) =>
                                    field.onChange({
                                      ...field.value,
                                      end: {
                                        ...field.value.start,
                                        hours: event.target.value,
                                      },
                                    })
                                  }
                                />
                                <Input
                                  type="number"
                                  step={1}
                                  min={0}
                                  max={59}
                                  value={field.value.end.minutes}
                                  onChange={(event) =>
                                    field.onChange({
                                      ...field.value,
                                      end: {
                                        ...field.value.start,
                                        minutes: event.target.value,
                                      },
                                    })
                                  }
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="hourWindows"
              control={form.control}
              render={(field) => {
                return (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Hour Windows</FormLabel>
                      {field.field.value.map((hourWindow) => (
                        <FormField
                          key={hourWindow.id}
                          name="hourWindows"
                          control={form.control}
                          render={({ field }) => (
                            <div>
                              <div>
                                {hourWindow.hourWindowsValue.start.hours}
                              </div>
                            </div>
                          )}
                        />
                      ))}
                    </div>
                  </FormItem>
                );
              }}
            />

            {/* <FormField
              name="test"
              render={() => (
                <Slider defaultValue={[100, 500]} max={1440}>
                  <SliderTrack>
                    <SliderRange />
                  </SliderTrack>
                  <SliderThumb />
                  <SliderThumb />
                </Slider>
              )}
            /> */}

            {/* <input
              type="number"
              value={start.hours}
              onChange={(event) =>
                setStart((previousStart) => ({
                  ...previousStart,
                  hours: Number(event.target.value),
                }))
              }
            />
            <input
              type="number"
              value={start.minutes}
              onChange={(event) =>
                setStart((previousStart) => ({
                  ...previousStart,
                  minutes: Number(event.target.value),
                }))
              }
            />
            <input
              type="number"
              value={end.hours}
              onChange={(event) =>
                setEnd((previousStart) => ({
                  ...previousStart,
                  hours: Number(event.target.value),
                }))
              }
            />
            <input
              type="number"
              value={end.minutes}
              onChange={(event) =>
                setEnd((previousStart) => ({
                  ...previousStart,
                  minutes: Number(event.target.value),
                }))
              }
            />
            <button
              onClick={(e) => {
                setHourWindows((previousHourWindows) => [
                  ...previousHourWindows,
                  { start: start, end: end },
                ]);
                e.preventDefault();
              }}
            >
              Test
            </button> */}

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
