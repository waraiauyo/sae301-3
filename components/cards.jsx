"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {CitysCombobox} from "@/components/comboboxs";
import {Switch} from "@/components/ui/switch";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";

const TrainingCard = ({training}) => {
    return (
        <Card className={"w-full"}>
            <CardHeader>
                <CardTitle>{training.parcours}</CardTitle>
                <CardDescription>À {training.ville}</CardDescription>
            </CardHeader>
            <CardContent>
                Alternance : {training.alternance.toString()}
            </CardContent>
        </Card>
    );
}

const TrainingFilterCard = ({training}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const wantAlt = searchParams.get("alt") === "true";

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    );

    return (
        <Card className={"sticky top-[calc(69px+1.5rem)] h-fit"}>
            <CardHeader>
                <CardTitle>Filtrer les formations</CardTitle>
            </CardHeader>
            <CardContent className={"flex flex-col gap-4"}>
                <CitysCombobox citys={training.citys} searchParams={searchParams}
                               createQueryString={createQueryString}/>
                <div className={"flex justify-between items-center"}>
                    <span className={"text-sm"}>Accepte l'alternance</span>
                    <Switch defaultChecked={wantAlt} onCheckedChange={() => {
                        router.replace(pathname + "?" + createQueryString("alt", !wantAlt));
                    }}/>
                </div>
            </CardContent>
        </Card>
    );
}

export {TrainingCard, TrainingFilterCard};