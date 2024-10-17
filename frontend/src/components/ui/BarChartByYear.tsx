"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { PoputalionModal } from "@/app/country-info/[countrycode]/page"

interface BarChartByYearProps {
  data: PoputalionModal[]
}

export function BarChartByYear({ data }: BarChartByYearProps) {
  return (
    <ChartContainer
      config={{
        population: {
          label: "year",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="min-h-[300px] w-full"
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis 
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => `${value.toLocaleString()}`}
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Year
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].payload.year}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Population
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar
          dataKey="value"
          fill="var(--color-population)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  )
}