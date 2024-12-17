"use client"

import {Section} from "@/components/wrappers";
import {TrainingCard, TrainingsFilterCard} from "@/components/cards";
import {TrainingsFilterCardSkeleton} from "@/components/skeletons";
import {SearchInput} from "@/components/inputs";
import {useEffect, useState} from "react";
import Fuse from "fuse.js";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

const HomePage = () => {
    return (
        <></>
    );
}

const SearchPage = ({trainings, params}) => {
    let trainingsFiltered = trainings

    const [city, setCity] = useState();
    const [alt, setAlt] = useState(true);
    const [page, setPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState(params ? params : "");
    const [searchResult, setSearchResult] = useState(trainings);

    const handleSearch = (e) => {
        setPage(10);
        setSearchQuery(e.target.value);

        if (city) trainingsFiltered = trainings.filter(training => training.ville === city);
        else trainingsFiltered = trainings;

        const fuse = new Fuse(trainingsFiltered, {keys: ["parcours"], threshold: 0.3});
        const results = fuse.search(searchQuery);
        const items = results.map(result => result.item);

        setSearchResult(items);
    }

    const filter = () => {
        trainingsFiltered = trainings.filter(training => training.ville === city);
        setSearchResult(trainings.filter(training => training.ville === city));
    }

    return (
        <Section className={"flex gap-2"}>
            {trainings ? <TrainingsFilterCard alt={alt} setAlt={setAlt} city={city} setCity={setCity} filter={filter} trainings={trainings}/> : <TrainingsFilterCardSkeleton/>}
            <div className="flex flex-col flex-wrap gap-2 w-3/4">
                <SearchInput searchQuery={searchQuery} onChange={handleSearch} />
                {searchResult.slice(0, page).map((training, i) => (
                    <TrainingCard training={training} key={i}/>
                ))}
                {searchResult.length > page ? (
                    <Button size={"lg"} className={"w-fit mx-auto"} onClick={() => setPage(p => p + 10)}>Charger plus <Plus size={20}/></Button>
                ) : null}
            </div>
        </Section>
    );
}

export {HomePage, SearchPage};