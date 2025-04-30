"use client";
import { FaArrowTrendUp } from "react-icons/fa6";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
} from "recharts";

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
type PieChartDataPoint = { name: string; value: number };
/**
 * PieChartProps defines the properties for the PieChart component.
 *
 * @property {PieChartDataPoint[]} data - The data to be displayed in the chart. Each object should have a `name` and `value` property.
 * @property {string} [title] - The title of the chart.
 * @property {string} [description] - The description of the chart.
 * @property {string} [footerText] - The footer text of the chart.
 * @property {string} [footerSubText] - The footer subtext of the chart.
 */
type PieChartProps = {
  data: PieChartDataPoint[];
  title?: string;
  description?: string;
  footerText?: string;
  footerSubText?: string;
};
const defaultChartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--accent-a))",
  },
} satisfies ChartConfig;
const COLORS = [
  "hsla(var(--accent-a))",
  "hsla(var(--accent-b))",
  "hsla(var(--accent-c))",
];
/*
PieChart component renders a pie chart with the provided data, utilizing accent colors,
and a vertical legend positioned to the right.
*/
export function PieChart({
  data,
  title,
  description,
  footerText,
  footerSubText,
}: PieChartProps) {
  // adjust height / radius based on slice count
  const height = data.length <= 4 ? 300 : 340;
  const radius = data.length <= 4 ? 70 : 60;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        {title && (
          <CardTitle className="text-center text-lg sm:text-xl">
            {title}
          </CardTitle>
        )}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <ChartContainer config={defaultChartConfig}>
          {/* flex-col on mobile, flex-row from md up */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            {/* Pie chart */}
            <div className="w-full md:w-1/2 h-[300px]">
              <ResponsiveContainer width="100%" height={height}>
                <RechartsPieChart
                  margin={{ top: 8, right: 0, bottom: 8, left: 0 }}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={radius}
                    innerRadius={0}
                    paddingAngle={1}
                    label={false}
                  >
                    {data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            {/* custom legend */}
            <ul className="w-full md:w-1/2 list-none text-sm space-y-2 px-2">
              {data.map((pt, i) => (
                <li key={pt.name} className="flex items-center">
                  <span
                    className="inline-block w-3 h-3 rounded-sm mr-2 shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="truncate">
                    {pt.name} (
                    {Number.isInteger(pt.value)
                      ? pt.value
                      : pt.value.toFixed(2)}
                    %)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ChartContainer>
      </CardContent>

      {(footerText || footerSubText) && (
        <CardFooter>
          <div className="flex w-full flex-col sm:flex-row items-start gap-2 text-sm">
            {footerText && (
              <div className="flex items-center gap-2 font-medium leading-none">
                {footerText} <FaArrowTrendUp className="h-4 w-4" />
              </div>
            )}
            {footerSubText && (
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                {footerSubText}
              </div>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
