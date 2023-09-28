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

import { FC } from "react";
import { Schedule } from "@/interfaces";
import { Checkbox } from "@/components/ui/checkbox";

import Testing from "../components/Testingdfsa";
import NewTestin from "@/components/NewTestingdfsa";
import { Slider } from "@/components/ui/slider";
import { SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider";
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
});

const CreateSchedule: FC = () => {
  // export function CreateSchedule() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      scheduleName: "",
      week: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    },
  });

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

            <NewTestin defaultValue={[25, 50]} />

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
