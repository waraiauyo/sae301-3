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
import {motion} from "framer-motion";
import {useHover, useHoverDirty} from "react-use";
import {ApplicationsAcceptedChart, ApplicationsChart} from "@/components/charts";

const TrainingsFilterCard = forwardRef(({city, setCity, alt, setAlt, filter, trainings}, ref) => {
    const citys = getKeyFromObject(trainings, "ville");

    return (
        <Card ref={ref}
              className={cn("w-1/4 h-fit bg-gradient-to-t from-primary/5 to-ground to-20% sticky transition-all top-[calc(68px+1.5rem)]")}>
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
        <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: "easeInOut"}}
        >
            <Card ref={ref} className="shadow-lg bg-black/80 text-white rounded-lg p-6">
                <CardHeader className="border-b pb-4">
                    <CardTitle className="text-primary text-2xl font-bold">
                        {master.parcours}
                    </CardTitle>
                    <p className="text-gray-400 mt-2">Référence : {master.ifc}</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 mt-4">
                    <div className="flex justify-between">
                        <span className="font-semibold">Établissement :</span>
                        <span>{master.etablissement}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Académie :</span>
                        <span>{master.academie}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Emplacement :</span>
                        <span>{master.lieux}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Mention :</span>
                        <span>{master.mention}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Discipline :</span>
                        <span>{master.discipline}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Secteur disciplinaire :</span>
                        <span>{master.secteur_disciplinaire}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Capacité :</span>
                        <span>{master.lastYearApplication.general.capacite}</span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
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