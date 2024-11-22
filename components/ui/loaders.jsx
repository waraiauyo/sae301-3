"use client"

import {Skeleton} from "@/components/ui/skeleton";

const TrainingSkeleton = () => {
    return (
        <>
            <Skeleton className={"h-32 rounded-xl w-full"}/>
            <Skeleton className={"h-32 rounded-xl w-full"}/>
            <Skeleton className={"h-32 rounded-xl w-full"}/>
            <Skeleton className={"h-32 rounded-xl w-full"}/>
            <Skeleton className={"h-32 rounded-xl w-full"}/>
        </>
    );
}

export {TrainingSkeleton};