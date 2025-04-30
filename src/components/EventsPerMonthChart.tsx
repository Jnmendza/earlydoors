"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useEventStore } from "@/store/event-store";
import { useEffect, useMemo } from "react";
import { format } from "date-fns";

const chartConfig = {
  events: {
    label: "Events",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function EventsPerMonthChart() {
  const { events, fetchEvents } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};

    events.forEach((event) => {
      const monthName = format(new Date(event.date), "MMMM");
      counts[monthName] = (counts[monthName] || 0) + 1;
    });

    const orderedMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return orderedMonths.map((month) => ({
      month,
      events: counts[month] || 0,
    }));
  }, [events]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Events Per Month</CardTitle>
        <CardDescription>
          Up to {format(new Date(), "MMMM yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className='overflow-y-scroll'>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout='vertical'
            margin={{ left: -20 }}
          >
            <XAxis type='number' dataKey='events' hide />
            <YAxis
              dataKey='month'
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='events' fill='var(--color-edorange)' radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Updated live <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing total created events per month
        </div>
      </CardFooter>
    </Card>
  );
}
