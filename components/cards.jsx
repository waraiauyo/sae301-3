"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {forwardRef, useRef, useState} from "react";
import {getKeyFromObject} from "@/lib/filters";
import {Label} from "@/components/ui/label";
import {cn, firstLetterUppercase} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight, Filter} from "lucide-react";
import {useHover, useHoverDirty} from "react-use";

const TrainingsFilterCard = forwardRef(({city, setCity, alt, setAlt, filter, trainings}, ref) => {
    const citys = getKeyFromObject(trainings, "ville");

    return (
        <Card ref={ref} className={cn("w-1/4 h-fit bg-gradient-to-t from-primary/5 to-ground to-20% sticky transition-all top-[calc(68px+1.5rem)]")}>
            <CardHeader>
                <CardTitle>Filtrer la recherche</CardTitle>
                <CardDescription>Pour préciser les résultats</CardDescription>
            </CardHeader>
            <CardContent className={"flex flex-col gap-4"}>
                <div className={"flex flex-col justify-start gap-1"}>
                    <Label htmlFor={"select-city"}>Ville</Label>
                    <Select value={city} onValueChange={(v) => setCity(v)}>
                        <SelectTrigger id={"select-city"}>
                            <SelectValue placeholder="Choisir une ville"/>
                        </SelectTrigger>
                        <SelectContent>
                            {citys.map((city) => (
                                <SelectItem value={city}>{firstLetterUppercase(city)}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className={"flex flex-col justify-start gap-1"}>
                    <Label htmlFor={"select-city"}>Propose alternance</Label>
                    <Select value={alt} onValueChange={(v) => setAlt(v)}>
                        <SelectTrigger disabled id={"select-city"}>
                            <SelectValue placeholder="Choisir alternance"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={true}>Oui</SelectItem>
                            <SelectItem value={false}>Non</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={filter} className={"w-full"} size={"lg"}>Appliquer le filtre <Filter size={20}/></Button>
            </CardFooter>
        </Card>
    );
});

const TrainingCard = forwardRef(({training}, ref) => {
    return (
        <Card ref={ref}>
            <CardHeader>
                <CardTitle>{training.parcours}</CardTitle>
                <CardDescription>{training.lieux}</CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter className={"flex justify-end"}>
                <Link href={`/training/${training.id}`}>
                    <Button>En savoir plus <ArrowRight size={20}/></Button>
                </Link>
            </CardFooter>
        </Card>
    );
});

export {TrainingsFilterCard, TrainingCard};