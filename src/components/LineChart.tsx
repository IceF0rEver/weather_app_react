import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ItemChart {
    dt: number;
    temp_min?: number;
    temp_max?: number;
    temp?: number;
};

interface configChart {
    [key: string]: {
      label: string;
      color: string;
    };
  };

export function LineChartComponent({ chartData, config }: { chartData: ItemChart[], config: configChart }) {

    const chartConfig = config satisfies ChartConfig

    return (
        <ChartContainer config={chartConfig}>
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                top: 20,
                left: 12,
                right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    {Object.entries(config).map(([dataKey, { color }]) => (
                        <Line
                            key={dataKey}
                            dataKey={dataKey}
                            type="natural"
                            stroke={color}
                            strokeWidth={2}
                            dot={false}
                        >
                            <LabelList position="top" offset={12} className="fill-foreground" fontSize={12}/>
                        </Line>
                    ))}
            </LineChart>
        </ChartContainer>
    )
}
