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

const CustomLegend = (props: unknown) => {
  const { payload } = props;

  return (
    <ul
      className="recharts-default-legend"
      style={{
        padding: 0,
        margin: 0,
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        marginLeft: "12px",
        gap: "2px", // Tighter spacing between items
      }}
    >
      {payload.map((entry: unknown, index: number) => {
        const dataPoint = entry.payload as unknown as PieChartDataPoint;
        const formattedValue = Number.isInteger(dataPoint.value)
          ? dataPoint.value
          : dataPoint.value.toFixed(2);

        return (
          <li
            key={`item-${index}`}
            className="recharts-legend-item"
            style={{ marginBottom: "2px" }}
          >
            <span className="recharts-surface" style={{ marginRight: "4px" }}>
              <svg
                width="14"
                height="14"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "4px",
                }}
              >
                <path
                  fill={entry.color}
                  d="M0,0h14v14h-14z"
                  className="recharts-legend-icon"
                />
              </svg>
            </span>
            <span style={{ fontSize: "0.85rem", color: "#666" }}>
              {entry.value} ({formattedValue}%)
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export function PieChart({
  data,
  title,
  description,
  footerText,
  footerSubText,
}: PieChartProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        {title && (
          <CardTitle className="text-center text-2xl">{title}</CardTitle>
        )}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={defaultChartConfig}>
          <div className="w-full md:h-[300px] h-[260px] flex">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                {/* Using custom legend component instead of the built-in Legend */}
                <Legend
                  content={<CustomLegend />}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{
                    paddingLeft: "0px",
                    paddingTop: "0px",
                    width: "40%",
                  }}
                />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="30%"
                  cy="50%"
                  outerRadius={80}
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
