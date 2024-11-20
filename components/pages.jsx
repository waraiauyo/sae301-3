"use client"

import {MasterSearchInput} from "@/components/inputs";
import {Section} from "@/components/wrappers";
import {useSearchParams} from "next/navigation";
import useSWR from "swr";
import {TrainingCard} from "@/components/cards";

const HomePage = () => {
    return (
        <>
            <Section>
                <MasterSearchInput/>
            </Section>
        </>
    );
}

const SearchPage = () => {
    const params = useSearchParams();
    const query = params.get("q");

    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const {data: trainings} = useSWR("https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/formations", fetcher);

    const trainingsFiltered = trainings ? trainings.filter(training => training.ville === query.toUpperCase() && training.parcours !== null) : null;

    return (
        <>
            <Section className={"pb-0"}>
                <MasterSearchInput/>
            </Section>
            <Section className={"flex flex-row gap-2 flex-wrap"}>
                {
                    trainingsFiltered ? (
                        trainingsFiltered.length > 0 ? (
                            trainingsFiltered.map((training) => (
                                <TrainingCard training={training}/>
                            ))
                        ) : "Aucun résultat"

                    ) : "Chargement..."
                }
            </Section>
        </>
    );
}

export {HomePage, SearchPage};