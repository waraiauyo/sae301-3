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
import {ApplicationsAcceptedChart, ApplicationsChart} from "@/components/charts";

const TrainingsFilterCard = forwardRef(({city, setCity, filter, trainings}, ref) => {
    const citys = getKeyFromObject(trainings, "ville");

    return (
        <Card ref={ref}
              className={cn("w-1/4 h-fit bg-background sticky transition-all top-[calc(68px+1.5rem)]")}>
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
            </CardContent>
            <CardFooter>
                <Button onClick={filter} className={"w-full"} size={"lg"}>Appliquer le filtre <Filter
                    size={20}/></Button>
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
                <Link href={`/master/${training.ifc}`}>
                    <Button>En savoir plus <ArrowRight size={20}/></Button>
                </Link>
            </CardFooter>
        </Card>
    );
});

const MasterInfoCard = forwardRef(({master}, ref) => {
    return (
        <Card ref={ref}>
            <CardHeader>
                <CardTitle>{master.parcours}</CardTitle>
                <CardDescription>Référence : {master.ifc}</CardDescription>
            </CardHeader>
            <CardContent className={"flex flex-col gap-2"}>
                <span>Etablissement : {master.etablissement}</span>
                <span>Académie : {master.academie}</span>
                <span>Emplacement : {master.lieux}</span>
                <span>Mention : {master.mention}</span>
                <span>Discipline : {master.discipline}</span>
                <span>Secteur disciplinaire : {master.secteur_disciplinaire}</span>
            </CardContent>
        </Card>
    );
});

const MasterStatsCardTest = forwardRef(({master}, ref) => {
    return (
        <Card ref={ref}>
            <CardHeader>
                <CardTitle>Statistiques</CardTitle>
                <CardDescription>De l'année {master.lastYearApplication.identifiants.anneeCollecte}.</CardDescription>
            </CardHeader>
            <CardContent className={"flex flex-col gap-2"}>
                <span>Capacité : {master.lastYearApplication.general.capacite}</span>
                <span>Candidatures : {master.lastYearApplication.general.nb} ( dont {master.lastYearApplication.general.nbFemmes} femmes )</span>
                <span>Nombre d'acceptés : {master.lastYearApplication.general.accept} ( dont {master.lastYearApplication.general.acceptFemmes} femmes )</span>
            </CardContent>
        </Card>
    );
});

export {TrainingsFilterCard, TrainingCard, MasterInfoCard, MasterStatsCardTest};