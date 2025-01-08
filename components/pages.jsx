"use client"

import {Section} from "@/components/wrappers";
import {
    MasterInfoCard,
    MasterStatsCard,
    MasterStatsCardTest,
    TrainingCard,
    TrainingsFilterCard
} from "@/components/cards";
import {TrainingsFilterCardSkeleton} from "@/components/skeletons";
import {SearchInput} from "@/components/inputs";
import {ArrowRight, MoveDown} from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {ApplicationsAcceptedChart, ApplicationsChart} from "@/components/charts";
import {SeparatorCards, SeparatorNumbers} from "@/components/separatorVictor";
import {FooterHome} from "@/components/footerMain";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import Link from "next/link";
import { motion } from "framer-motion";


const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            // Redirection vers la page /search avec la requête
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };
    return (
        <>
            <motion.div initial={{ opacity: 0 }}
                        animate={{ opacity: 1}}
                        exit={{ opacity: 0}}
                        transition={{ duration: 0.5 }}
                        className="h-[calc(100vh-68px)] flex items-center justify-center">
                <div className=" w-[1090px] h-[400px] bg-primary/80 rounded-[100%] absolute z-1 -top-10 left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[120px]"></div>
                <div className="flex flex-col gap-2 text-center justify-center">
                    <h1 className="font-black text-6xl">S'informer, candidater, décider</h1>
                    <h2 className="text-xl mb-20">Recherche de master avec son taux d'insertion professionnel</h2>
                    <SearchInput
                        className={"w-full"}
                        searchQuery={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onSearch={handleSearch} // Recherche sur "Entrée"
                    />
                    <MoveDown size={40} className="text-primary mx-auto mt-40"/>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }}
                        animate={{ opacity: 1}}
                        exit={{ opacity: 0}}
                        transition={{ duration: 0.5 }}
                        className="h-[calc(100vh-68px)] flex-col items-center justify-between">
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
            </motion.div>
            <motion.div initial={{ opacity: 0 }}
                        animate={{ opacity: 1}}
                        exit={{ opacity: 0}}
                        transition={{ duration: 0.5 }}
                        className="h-[calc(100vh-68px)] flex-col items-center justify-between">
                <h2 className="text-xl font-bold text-center mb-4">Préparer son projet d'orientation</h2>
                <div>
                    <SeparatorCards/>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="text-xl font-bold text-center mt-12 mb-2">Des questions ?</h2>
                    <p className="text-sm  mb-6">Toutes nos réponses dans notre FAQ.</p>
                    <Link href="/faq">
                        <Button>Découvrez notre FAQ <ArrowRight size={20}/></Button>
                    </Link>
                </div>
            </motion.div>
            <FooterHome/>
        </>
    );
}

const SearchPage = ({trainings, params}) => {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("query") || ""; // Requête depuis l'URL

    const [city, setCity] = useState();
    const [alt, setAlt] = useState(true);
    const [page, setPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        // Recherche initiale basée sur la query string
        if (initialQuery) {
            handleSearch({ target: { value: initialQuery } });
        }
    }, [initialQuery, trainings]);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        let trainingsFiltered = trainings;

        if (city) trainingsFiltered = trainings.filter((training) => training.ville === city);

        const fuse = new Fuse(trainingsFiltered, { keys: ["parcours"], threshold: 0.3 });
        const results = fuse.search(query);
        setSearchResult(results.map((result) => result.item));
    };

    const filter = () => {
        const filtered = trainings.filter((training) => training.ville === city);
        setSearchResult(filtered);
    };

    return (
        <Section className={"flex gap-2"}>

            {trainings ? <TrainingsFilterCard alt={alt} setAlt={setAlt} city={city} setCity={setCity} filter={filter}
                                              trainings={trainings}/> : <TrainingsFilterCardSkeleton/>}
            <div className="flex flex-col flex-wrap gap-2 w-3/4">
                <SearchInput searchQuery={searchQuery} onChange={handleSearch}/>
                {searchResult.slice(0, page).map((training, i) => (
                    <TrainingCard training={training} key={i} />
                ))}
                {searchResult.length > page ? (
                    <Button size={"lg"} className={"w-fit mx-auto"} onClick={() => setPage(p => p + 10)}>Voir plus<Plus
                        size={20}/></Button>
                ) : null}
            </div>
        </Section>
    );
}

const MasterPage = ({master}) => {
    return (
        <Section className={"flex gap-2 flex-col"}>
            <MasterInfoCard master={master}/>
            <div className={"flex flex-col gap-2"}>
                <div className={"flex gap-2"}>
                    <ApplicationsChart data={master}/>
                    <ApplicationsAcceptedChart data={master}/>
                </div>
            </div>
        </Section>
    );
}

const FAQpage = () => {
    return (
        <Section className="h-[calc(100vh-68px)]">
            <div className="h-screen bg-black text-white flex flex-col items-center justify-center px-4">
                <h1 className="text-4xl font-bold text-center mb-10">Foire Aux Questions (FAQ)</h1>
                <div className="w-full max-w-4xl bg-black/40 backdrop-blur-lg p-6 rounded-lg">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-lg text-white hover:text-primary">
                                Comment rechercher un master ?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                Vous pouvez utiliser notre barre de recherche pour explorer les masters par nom, domaine
                                d'étude ou localisation.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-lg text-white hover:text-primary">
                                Comment sont calculés les taux d'insertion professionnelle ?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                Les taux d'insertion sont basés sur des données officielles fournies par le ministère de
                                l'Éducation et les universités.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-lg text-white hover:text-primary">
                                Le site est-il mis à jour régulièrement ?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                Oui, nos données sont actualisées chaque trimestre pour refléter les dernières
                                statistiques
                                et offres de formation.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger className="text-lg text-white hover:text-primary">
                                En France ou à l'étranger ?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                Vous pouvez effectuer un master à l'étranger cependant seuls ceux en France sont répertoriés sur notre site.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </Section>
    )
}

export {HomePage, SearchPage, MasterPage, FAQpage};