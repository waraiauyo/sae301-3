"use client"

import {Section} from "@/components/wrappers";
import {TrainingCard, TrainingsFilterCard} from "@/components/cards";
import useSWR from "swr";
import {TrainingsFilterCardSkeleton} from "@/components/skeletons";
import {SearchInput} from "@/components/inputs";

const HomePage = () => {
    return (
        <></>
    );
}

const SearchPage = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const {data: trainings} = useSWR("https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/formations", fetcher);

    return (
        <Section className={"flex gap-2"}>
            {trainings ? <TrainingsFilterCard trainings={trainings}/> : <TrainingsFilterCardSkeleton/>}
            <div className="flex flex-col flex-wrap gap-2 w-3/4">
                <SearchInput/>
                {trainings ? trainings.map((training, i) => (
                    <TrainingCard training={training} key={i}/>
                )) : "cahar"}
            </div>
        </Section>
    );
}

export {HomePage, SearchPage};