"use client"

import {Section} from "@/components/wrappers";
import {TrainingCard, TrainingsFilterCard} from "@/components/cards";
import {TrainingsFilterCardSkeleton} from "@/components/skeletons";
import {SearchInput} from "@/components/inputs";
import {useEffect, useState} from "react";
import {getTrainings} from "@/lib/data";
import Fuse from "fuse.js";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

const HomePage = () => {
    return (
        <></>
    );
}

const SearchPage = ({trainings, params}) => {
    const [page, setPage] = useState(10);
    const [search, setSearch] = useState(params ? params : "");
    const [searchResult, setSearchResult] = useState(trainings);

    const handleSearch = (e) => {
        setPage(10);
        setSearch(e.target.value);

        const fuse = new Fuse(trainings, {keys: ["parcours"]});
        const results = fuse.search(search);
        const items = results.map(result => result.item);

        setSearchResult(items);
    } 

    const onFilter = (city, alt) => {
        setSearchResult(prev => prev.filter(v => v.ville === city));
    }

    return (
        <Section className={"flex gap-2"}>
            {trainings ? <TrainingsFilterCard onFilter={onFilter} trainings={trainings}/> : <TrainingsFilterCardSkeleton/>}
            <div className="flex flex-col flex-wrap gap-2 w-3/4">
                <SearchInput search={search} setSearch={setSearch} onChange={handleSearch} />
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