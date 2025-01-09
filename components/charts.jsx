"use client"

import {Bar, BarChart, CartesianGrid, Label, Pie, PieChart, XAxis, YAxis} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--primary))",
    },
};

export function ApplicationsChart({data}) {
    const chartData = [
        {type: "Homme", nombre: data.lastYearApplication.general.nb},
        {type: "Femme", nombre: data.lastYearApplication.general.nbFemmes},
    ];

    return (
        <Card className={"w-full bg-black/80"}>
            <CardHeader>
                <CardTitle>Nombre de candidature</CardTitle>
                <CardDescription>Sur
                    l'année {data.lastYearApplication.identifiants.anneeCollecte - 1} - {data.lastYearApplication.identifiants.anneeCollecte}.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="type"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickCount={3}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed"/>}
                        />
                        <Bar dataKey="nombre" fill="var(--color-desktop)" radius={4}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export function ApplicationsAcceptedChart({data}) {
    const total = data.lastYearApplication.general.nb + data.lastYearApplication.general.nbFemmes;
    const chartData = [
        {type: "Homme", nombre: data.lastYearApplication.general.accept, fill: "hsl(var(--primary))"},
        {type: "Femme", nombre: data.lastYearApplication.general.acceptFemmes, fill: "hsl(var(--secondary))"},
    ];

    return (
        <Card className="flex flex-col w-full bg-black/80">
            <CardHeader>
                <CardTitle>Candidatures acceptées.</CardTitle>
                <CardDescription>Sur
                    l'année {data.lastYearApplication.identifiants.anneeCollecte - 1} - {data.lastYearApplication.identifiants.anneeCollecte}.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto">
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />
                        <Pie
                            data={chartData}
                            dataKey="nombre"
                            nameKey="type"
                            innerRadius={80}
                            strokeWidth={5}
                        >
                            <Label
                                content={({viewBox}) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {total.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total candidatures
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}