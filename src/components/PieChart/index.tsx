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
  // Function to calculate optimal chart dimensions based on data size
  const getChartDimensions = () => {
    const baseHeight = data.length <= 4 ? 320 : 350;
    return {
      height: baseHeight,
      outerRadius: data.length <= 4 ? 70 : 65,
      cx: data.length <= 5 ? "35%" : "30%",
    };
  };

  // Get optimal dimensions
  const dimensions = getChartDimensions();

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        {title && <CardTitle className="text-center text-lg sm:text-xl">{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer config={defaultChartConfig}>
          <div className="w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height={dimensions.height}>
              <RechartsPieChart margin={{ top: 10, right: 0, bottom: 10, left: 0 }}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{
                    fontSize: "0.8rem",
                    paddingLeft: "4px",
                    lineHeight: "1.2", 
                    maxWidth: "45%",
                    overflowWrap: "break-word",
                  }}
                  formatter={(value, legendEntry) => {
                    const payload = (legendEntry.payload as unknown) as PieChartDataPoint;
                    const val = Number.isInteger(payload.value)
                      ? payload.value
                      : payload.value.toFixed(2);
                    
                    // Limit label length for mobile
                    const maxLength = 15;
                    const displayName = value.length > maxLength 
                      ? `${value.substring(0, maxLength)}...`
                      : value;
                      
                    return (
                      <span className="text-xs sm:text-sm">
                        {displayName} ({val}%)
                      </span>
                    );
                  }}
                />

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx={dimensions.cx}
                  cy="50%"
                  outerRadius={dimensions.outerRadius}
                  paddingAngle={1}
                  label={false}
                >
                  {data.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
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