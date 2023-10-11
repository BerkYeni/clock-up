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
    console.log(form.formState);
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
              render={WeekdaysField}
            />

            <FormField
              name="hourWindowModule"
              control={form.control}
              render={() => {
                return (
                  <>
                    <FormItem>
                      <FormLabel>Time Frames</FormLabel>
                      <FormField
                        name="hourWindowModule"
                        control={form.control}
                        render={({ field }) => {
                          // TODO: swap this with materialui time picker android ver
                          return (
                            <FormItem>
                              <div className="flex">
                                <FormControl>
                                  <Input
                                    type="number"
                                    step={1}
                                    // min={0}
                                    // max={23}
                                    value={
                                      field.value.hourWindowInput.start.hours
                                    }
                                    onChange={(event) =>
                                      field.onChange({
                                        ...field.value,
                                        hourWindowInput: {
                                          ...field.value.hourWindowInput,
                                          start: {
                                            ...field.value.hourWindowInput
                                              .start,
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
                                    value={
                                      field.value.hourWindowInput.start.minutes
                                    }
                                    onChange={(event) =>
                                      field.onChange({
                                        ...field.value,
                                        hourWindowInput: {
                                          ...field.value.hourWindowInput,
                                          start: {
                                            ...field.value.hourWindowInput
                                              .start,
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
                                    value={
                                      field.value.hourWindowInput.end.hours
                                    }
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
                                    value={
                                      field.value.hourWindowInput.end.minutes
                                    }
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
                                      const biggestId = field.value.hourWindows
                                        .length
                                        ? Math.max(
                                            ...field.value.hourWindows.map(
                                              (window) => window.id
                                            )
                                          )
                                        : -1;
                                      const newWindow = {
                                        id: biggestId + 1,
                                        hourWindowsValue: {
                                          start: {
                                            hours:
                                              field.value.hourWindowInput.start
                                                .hours,
                                            minutes:
                                              field.value.hourWindowInput.start
                                                .minutes,
                                          },
                                          end: {
                                            hours:
                                              field.value.hourWindowInput.end
                                                .hours,
                                            minutes:
                                              field.value.hourWindowInput.end
                                                .minutes,
                                          },
                                        },
                                      };
                                      field.onChange({
                                        ...field.value,
                                        hourWindows: [
                                          ...field.value.hourWindows,
                                          newWindow,
                                        ],
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
                        }}
                      />
                    </FormItem>
                    <FormItem>
                      <FormField
                        name="hourWindowModule"
                        control={form.control}
                        render={(field) => (
                          <div className="mb-4">
                            <FormItem>
                              <FormLabel>Hour Windows</FormLabel>

                              <ScrollArea className="overflow-y-auto w-full h-36 rounded-md border">
                                <div className="p-4">
                                  {field.field.value.hourWindows.map(
                                    (hourWindow) => (
                                      <div key={hourWindow.id}>
                                        <FormField
                                          name="hourWindowModule"
                                          control={form.control}
                                          render={({ field }) => (
                                            <div className="border-2 border-zinc-950 rounded-md">
                                              <div className="flex w-full justify-between items-center">
                                                {
                                                  `${toStringHourAndMinute(
                                                    hourWindow.hourWindowsValue
                                                      .start
                                                  )} - ${toStringHourAndMinute(
                                                    hourWindow.hourWindowsValue
                                                      .end
                                                  )}` // TODO: implement to string am pm
                                                }

                                                <Button
                                                  onClick={(event) => {
                                                    event.preventDefault();
                                                    field.onChange({
                                                      ...field.value,
                                                      hourWindows:
                                                        field.value.hourWindows.filter(
                                                          (window) =>
                                                            window.id !==
                                                            hourWindow.id
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
                                    )
                                  )}
                                </div>
                              </ScrollArea>
                              <FormMessage />
                            </FormItem>
                          </div>
                        )}
                      />
                      <FormMessage />
                    </FormItem>
                  </>
                );
              }}
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
