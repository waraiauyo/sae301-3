"use client"

import {forwardRef} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

const TrainingsFilterCardSkeleton = forwardRef(({}, ref) => {
    return (
        <Card ref={ref} className={"w-1/4"}>
            <CardHeader>
                <CardTitle><Skeleton className={"w-36 h-6"}/></CardTitle>
                <CardDescription><Skeleton className={"w-52 h-4"}/></CardDescription>
            </CardHeader>
            <CardContent className={"flex flex-col gap-2"}>
                <div className={"flex flex-col justify-start gap-1"}>
                    <Skeleton className={"w-10 h-4"}/>
                    <Skeleton className={"w-full h-9"}/>
                </div>
                <div className={"flex flex-col justify-start gap-1"}>
                    <Skeleton className={"w-24 h-4"}/>
                    <Skeleton className={"w-full h-9"}/>
                </div>
            </CardContent>
            <CardFooter>
                <Skeleton className={"w-full h-10"}/>
            </CardFooter>
        </Card>
    );
});

export {TrainingsFilterCardSkeleton};