"use client"

import {Section} from "@/components/wrappers";
import {TrainingCard, TrainingsFilterCard} from "@/components/cards";
import {TrainingsFilterCardSkeleton} from "@/components/skeletons";
import {SearchInput} from "@/components/inputs";
import {ArrowRight, MoveDown} from "lucide-react";
import {useState} from "react";
import Fuse from "fuse.js";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {SeparatorCards, SeparatorNumbers} from "@/components/separatorVictor";
import {FooterHome} from "@/components/footerMain";

const HomePage = () => {
    return (
        <>
            <Section className="h-[calc(100vh-68px)] flex items-center justify-center">
                <div className="circlePosition w-[1090px] h-[400px] bg-primary/80 rounded-[100%] absolute z-1 -top-10 left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[120px]"></div>
                <div className="flex flex-col gap-2 text-center justify-center">
                    <h1 className="font-black text-6xl">S'informer, candidater, décider</h1>
                    <h2 className="text-xl mb-20">Recherche de master avec son taux d'insertion professionnel</h2>
                    <SearchInput className={"w-full"}/>
                    <MoveDown size={40} className="text-primary mx-auto mt-40"/>
                </div>
            </Section>
            <Section className="h-[calc(100vh-68px)] flex-col items-center justify-between">
                <h2 className="text-xl font-bold text-center mb-4">Quel master après ma license ?</h2>
                <div className="flex gap-20 text-start">
                    <article
                        className="text-pretty basis-1/3 blurtext mt-[50px] bg-black/40 backdrop-blur-lg relative z-10 rounded-sm justify-center  p-2">
                        <h3 className="text-balance font-black mb-2 text-start text-2xl">DIPLÔMES NATIONAUX</h3>
                        <p>Consulter l’intégralité des diplômes nationaux de master proposés par les établissements
                            d’enseignement supérieur accrédités.</p>
                    </article>
                    <article
                        className="text-pretty basis-1/3 blurtext mt-[50px] bg-black/40 backdrop-blur-lg relative z-10 rounded-sm justify-center p-2 ">
                        <h3 className="text-balance font-black mb-2 text-start text-2xl">CANDIDATURES</h3>
                        <p>Déposer vos candidatures pour l’accès en première année de master dasn toutes les villes de
                            France.</p>
                    </article>
                    <article
                        className="text-pretty basis-1/3 blurtext mt-[50px] bg-black/40 backdrop-blur-lg relative z-10 rounded-sm justify-center  p-2">
                        <h3 className="text-balance font-black mb-2 text-start text-2xl">RÉPONSES</h3>
                        <p>D’être accompagné par les services rectoraux dans le cas où vous n'auriez reçu aucune réponse
                            positive à vos candidatures.</p>
                    </article>
                </div>
                <div className="flex flex-col gap-20 items-center">
                    <SeparatorNumbers/>
                    <MoveDown size={40} className="text-primary mx-auto mt-10"/>
                </div>
            </Section>
            <Section className="h-[calc(100vh-68px)] flex-col items-center justify-between">
                <h2 className="text-xl font-bold text-center mb-4">Préparer son projet d'orientation</h2>
                <div>
                    <SeparatorCards/>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="text-xl font-bold text-center mt-12 mb-2">Des questions ?</h2>
                    <p className="text-sm  mb-6">Toutes nos réponses dans notre FAQ.</p>
                    <Button>Découvrez notre FAQ <ArrowRight size={20}/></Button>
                </div>
            </Section>
            <FooterHome/>
        </>
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