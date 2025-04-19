"use client";

import { FaArrowTrendUp } from "react-icons/fa6";
import {
  Cell,
  Legend,
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
  return (
    <Card className="w-full">
      <CardHeader>
        {title && <CardTitle className="text-center">{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={defaultChartConfig}>
          <div className="w-full min-h-[350px]">
            <ResponsiveContainer width="100%" height={350}>
              <RechartsPieChart
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{
                    fontSize: "0.85rem",
                    paddingLeft: "10px",
                    lineHeight: "1.8em",
                    maxWidth: "40%", // Control legend width
                  }}
                  formatter={(value, entry) => {
                    const payload =
                      entry.payload as unknown as PieChartDataPoint;
                    // Format to 2 decimal places if needed
                    const formattedValue = Number.isInteger(payload.value)
                      ? payload.value
                      : payload.value.toFixed(2);
                    return `${value} (${formattedValue}%)`;
                  }}
                />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="35%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={0}
                  paddingAngle={1}
                  label={false}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
      {(footerText || footerSubText) && (
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
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
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
