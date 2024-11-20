"use client"

import {Card, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"

const TrainingCard = ({training}) => {
    return (
        <Card className={"w-96"}>
            <CardHeader>
                <CardTitle>{training.parcours}</CardTitle>
                <CardDescription>À {training.ville}</CardDescription>
            </CardHeader>
        </Card>
    );
}

export {TrainingCard};