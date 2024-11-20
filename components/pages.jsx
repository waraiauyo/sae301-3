"use client"

import {MasterSearchInput} from "@/components/inputs";
import {Section} from "@/components/wrappers";
import {useSearchParams} from "next/navigation";
import useSWR from "swr";

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

    const trainingsFiltered = trainings ? trainings.filter(training => training.ville === query) : null;

    return (
        <>{trainingsFiltered ? JSON.stringify(trainingsFiltered) : "Chargement..."}</>
    );
}

export {HomePage, SearchPage};