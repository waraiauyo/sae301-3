"use client"

import {MasterSearchInput} from "@/components/inputs";
import {Section} from "@/components/wrappers";
import {useSearchParams} from "next/navigation";
import useSWR from "swr";
import {TrainingCard, TrainingFilterCard} from "@/components/cards";
import {TrainingSkeleton} from "@/components/ui/loaders";

const HomePage = () => {
    return (
        <>
            <Section className={"pb-0"}>
                <MasterSearchInput/>
            </Section>
            <Section>
                La barre de recherche ci-dessus permet de rechercher les formations par rapport à la ville d'entrée
                (case très sensible), le bouton "Se connecter" permet juste de dire qu'il y aura un système de connexion
                à la fin du dev. Du site, la page "Les masters" permet de filtrer toutes les formations disponibles via
                l'API.
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

const TrainingPage = ({training}) => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    let {data: trainings} = useSWR("https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/formations", fetcher);

    const searchParams = useSearchParams();

    //Système de tri pour les résultats ( le code est HORRIBLE mais trql c'est qu'une v1 )
    trainings ? trainings = trainings.filter(training => (searchParams.has("alt") ? training.alternance === (searchParams.get("alt") === "true") : true) && (searchParams.has("city") ? training.ville === searchParams.get("city") : true) && training.ville !== null && training.parcours !== null) : null

    return (
        <>
            <Section className={"pb-0 flex justify-between gap-6"}>
                <div className="flex flex-col gap-2 w-1/4 sticky">
                    <TrainingFilterCard training={training}/>
                </div>
                <div className={"flex flex-col gap-2 w-3/4"}>
                    {trainings ? <span>{trainings.length} résultat(s)</span> : null}
                    {
                        trainings ? (
                            trainings.length > 0 ? (
                                trainings.map((training) => (
                                    <TrainingCard training={training}/>
                                ))
                            ) : "Aucun résultat"
                        ) : <TrainingSkeleton/>
                    }
                </div>
            </Section>
        </>
    );
}

export {HomePage, SearchPage, TrainingPage};