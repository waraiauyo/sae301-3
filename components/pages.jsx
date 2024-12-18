"use client"

import {Section} from "@/components/wrappers";
import {TrainingCard, TrainingsFilterCard} from "@/components/cards";
import useSWR from "swr";
import {TrainingsFilterCardSkeleton} from "@/components/skeletons";
import {SearchInput} from "@/components/inputs";
import {useSearchParams} from "next/navigation";
import {useState} from "react";
import {MoveDown} from "lucide-react";

const HomePage = () => {
    return (
        <>
            <Section className="h-[calc(100vh-68px)] flex items-center justify-center">
                <div className="circlePosition w-[1090px] h-[400px] bg-primary/80 rounded-[100%] absolute z-1 -top-10 left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[120px]"></div>
                <div className="flex flex-col gap-2 text-center justify-center">
                    <h1 className="font-black text-6xl">S'informer, candidater, décider</h1>
                    <h2 className="text-xl mb-2">Recherche de master avec son taux d'insertion professionnel</h2>
                    <SearchInput className={"w-full"}/>
                    <MoveDown size={40} className="text-primary mx-auto mt-40"/>
                </div>
            </Section>
            <Section className="h-[calc(100vh-68px)] flex-col items-center justify-between">
                <h2 className="text-xl font-bold">Quel master après ma license ?</h2>
                <div className="flex flex-row gap-2 items-center text-start">
                    <div className="basis-1/3">
                        <h3>La plateforme "MSTR" vous permet :</h3>
                        <p>De consulter l’intégralité des diplômes nationaux de master proposés par les établissements
                            d’enseignement supérieur accrédités</p>
                    </div>
                    <div className="basis-1/3">
                        <h3>La plateforme "MSTR" vous permet :</h3>
                        <p>De déposer vos candidatures pour l’accès en première année de master</p>
                    </div>
                    <div className="basis-1/3">
                        <h3>La plateforme "MSTR" vous permet :</h3>
                        <p>D’être accompagné par les services rectoraux dans le cas où vous n'auriez reçu aucune réponse
                            positive à vos candidatures</p>
                    </div>
                </div>
            </Section>
        </>
    );
}

const SearchPage = ({params}) => {
    const [search, setSearch] = useState(params);

    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    let {data: trainings} = useSWR("https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/formations", fetcher);

    return (
        <Section className={"flex gap-2"}>
            {trainings ? <TrainingsFilterCard trainings={trainings}/> : <TrainingsFilterCardSkeleton/>}
            <div className="flex flex-col flex-wrap gap-2 w-3/4">
                <SearchInput search={search} setSearch={setSearch}/>
                {trainings ? trainings.map((training, i) => (
                    <TrainingCard training={training} key={i}/>
                )) : "cahar"}
            </div>
        </Section>
    );
}

export {HomePage, SearchPage};