"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@radix-ui/themes";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components//ui/chart";
import { Separator } from "@/components//ui/separator";

interface Count {
  isRequestCount: number;
  isProcessCount: number;
  isDoneCount: number;
  isRequestTodayCount: number;
  isProcessTodayCount: number;
  isDoneTodayCount: number;
}

export const Dashboard = ({
  isRequestCount,
  isProcessCount,
  isDoneCount,
  isRequestTodayCount,
  isProcessTodayCount,
  isDoneTodayCount,
}: Count) => {
  const calculatePercentage = (
    todayCount: number | null,
    totalCount: number | null
  ): number => {
    if (totalCount === null || totalCount === 0) {
      return 0;
    }
    return todayCount ? (todayCount / totalCount) * 100 : 0;
  };

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl text-muted-foreground">{isDoneCount}</div>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl text-muted-foreground">
              {isProcessCount}
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">Need Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl text-muted-foreground">
              {isRequestCount}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="chart-wrapper flex w-full flex-col flex-wrap items-center justify-center">
        <Card className="w-full">
          <CardContent className="flex gap-4 p-4 pb-2 w-full">
            <ChartContainer
              config={{
                move: {
                  label: "Completed",
                  color: "hsl(var(--chart-1))",
                },
                stand: {
                  label: "Processing",
                  color: "hsl(var(--chart-2))",
                },
                exercise: {
                  label: "Need Help",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[140px] w-full"
            >
              <BarChart
                margin={{
                  left: 20,
                  right: 0,
                  top: 0,
                  bottom: 10,
                }}
                data={[
                  {
                    activity: "Completed",
                    value: calculatePercentage(isDoneTodayCount, isDoneCount),
                    fill: "rgb(16, 185, 129)",
                    label: `+${calculatePercentage(
                      isDoneTodayCount,
                      isDoneCount
                    )}% of yesterday`,
                  },
                  {
                    activity: "Processing",
                    value: calculatePercentage(
                      isProcessTodayCount,
                      isProcessCount
                    ),
                    fill: "rgb(139, 92, 246)",
                    label: `+${calculatePercentage(
                      isProcessTodayCount,
                      isProcessCount
                    )}% of yesterday`,
                  },
                  {
                    activity: "Need Help",
                    value: calculatePercentage(
                      isRequestTodayCount,
                      isRequestCount
                    ),
                    fill: "rgb(239, 68, 68)",
                    label: `+${calculatePercentage(
                      isRequestTodayCount,
                      isRequestCount
                    )}% of yesterday`,
                  },
                ]}
                layout="vertical"
                barSize={32}
                barGap={2}
                className="w-full"
              >
                <XAxis type="number" dataKey="value" hide />
                <YAxis
                  dataKey="activity"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  className="capitalize"
                />
                <Bar dataKey="value" radius={5} className="w-full">
                  <LabelList
                    position="insideLeft"
                    dataKey="label"
                    fill="white"
                    offset={8}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex justify-center items-center border-t p-4 w-full">
            <div className="flex mx-auto items-center gap-2">
              Daily Request Report Chart
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
