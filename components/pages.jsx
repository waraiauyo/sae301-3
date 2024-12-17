"use client"

import {Section} from "@/components/wrappers";
import {TrainingCard, TrainingsFilterCard} from "@/components/cards";
import useSWR from "swr";
import {TrainingsFilterCardSkeleton} from "@/components/skeletons";
import {SearchInput} from "@/components/inputs";

const HomePage = () => {
    return (
        <section className="h-full bg-radient-[169.40%_89.55%_at_94.76%_6.29%] from-[#0006] to-transparent">
            <div className="circlePosition w-[490px] h-[400px] bg-primary">

            </div>
            <div className="flex flex-col gap-2 mx-2">
                <h1 className="text-center">Recherche de master avec son taux d'insertion professionnel</h1>
                <SearchInput/>
            </div>
        </section>
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