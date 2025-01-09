"use client"

import {Section} from "@/components/wrappers";
import {
    MasterInfoCard,
    TrainingCard,
    TrainingsFilterCard
} from "@/components/cards";
import {TrainingsFilterCardSkeleton} from "@/components/skeletons";
import {SearchInput} from "@/components/inputs";
import {ArrowRight, MoveDown, CalendarX, GraduationCap, Filter, Lightbulb, Compass} from "lucide-react";
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
import {motion} from "framer-motion";


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
            <motion.div initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.5}}
                        className="h-[calc(100vh-68px)] flex items-center justify-center">
                <div
                    className=" w-[1090px] h-[400px] bg-primary/80 rounded-[100%] absolute z-1 -top-10 left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[120px]"></div>
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
            <motion.div initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.5}}
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
            <motion.div initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.5}}
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

const SearchPage = ({trainings}) => {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("query") || ""; // Requête depuis l'URL

    const [city, setCity] = useState();
    const [page, setPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [searchResult, setSearchResult] = useState(trainings);

    useEffect(() => {
        // Recherche initiale basée sur la query string
        if (initialQuery) {
            handleSearch({target: {value: initialQuery}});
        }
    }, [initialQuery, trainings]);

    const handleSearch = (e) => {
        const query = e;
        setSearchQuery(query);
        let trainingsFiltered = trainings;

        if (city) trainingsFiltered = trainings.filter((training) => training.ville === city);

        const fuse = new Fuse(trainingsFiltered, {keys: ["parcours"], threshold: 0.3});
        const results = fuse.search(query);
        setSearchResult(results.map((result) => result.item));
    };

    const filter = () => {
        handleSearch(searchQuery);
    };

    return (
        <Section className={"flex gap-2"}>
            <TrainingsFilterCard city={city} setCity={setCity} filter={filter}
                                 trainings={trainings}/>
            <div className="flex flex-col flex-wrap gap-2 w-3/4">
                <SearchInput searchQuery={searchQuery} onChange={(e) => handleSearch(e.target.value)}/>
                {searchResult.slice(0, page).map((training, i) => (
                    <TrainingCard training={training} key={i}/>
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
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-[calc(100vh-68px)]"
        >
            <div className="h-screen bg-black text-white flex flex-col items-center justify-center px-4">
                {/* Header */}
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
                    className="text-4xl font-bold text-center mb-10"
                >
                    Foire Aux Questions (FAQ)
                </motion.h1>

                {/* Accordion Container */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
                    className="w-full max-w-4xl bg-black/40 backdrop-blur-lg p-6 rounded-lg"
                >
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
                                statistiques et offres de formation.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger className="text-lg text-white hover:text-primary">
                                En France ou à l'étranger ?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                Vous pouvez effectuer un master à l'étranger cependant seuls ceux en France sont
                                répertoriés sur notre site.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </motion.div>
            </div>
            <FooterHome/>
        </motion.div>
    );
};

const InformPage = () => {
    const sectionVariants = {
        hidden: {opacity: 0, y: 10},
        visible: {opacity: 1, y: 0},
    };

    const transitionSettings = {duration: 0.5, ease: "easeInOut"};

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <motion.section
                initial="hidden"
                animate="visible"
                transition={transitionSettings}
                className="text-center mb-12"
            >
                <h1 className="text-3xl font-bold mb-4 sm:text-4xl text-primary">
                    Tout savoir sur les Masters en France
                </h1>
                <p className="text-white text-lg max-w-2xl mx-auto">
                    Découvrez les clés pour bien comprendre les masters en France, comment
                    orienter vos choix et utiliser efficacement nos outils pour trouver votre
                    voie.
                </p>
            </motion.section>
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                variants={sectionVariants}
                className="mb-16"
            >
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                    1. Comprendre les Masters
                </h2>
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="flex-1">
                        <p className="text-white">
                            Les masters en France sont des diplômes nationaux organisés sur
                            deux années (M1 et M2). Ils offrent une spécialisation dans de
                            nombreux domaines, allant des sciences aux arts.
                        </p>
                        <p className="text-white mt-4">
                            Chaque master est conçu pour répondre à des besoins spécifiques du
                            marché du travail, tout en offrant une opportunité d'approfondir
                            vos connaissances académiques.
                        </p>
                    </div>
                    {/* Icon */}
                    <GraduationCap size={100} className="text-primary flex-1"/>
                </div>
            </motion.section>

            {/* Section 2: Utiliser les Filtres de Recherche */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                variants={sectionVariants}
                className="mb-16"
            >
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                    2. Utiliser les Filtres de Recherche
                </h2>
                <div className="flex flex-col sm:flex-row-reverse gap-6 items-center">
                    {/* Text Content */}
                    <div className="flex-1">
                        <p className="text-white">
                            Notre filtre de recherche vous permet de trouver des masters en
                            fonction de critères tels que la ville, le domaine d'études, et le
                            taux d'insertion professionnelle.
                        </p>
                        <p className="text-white mt-4">
                            Essayez différents mots-clés ou utilisez nos suggestions pour
                            affiner vos résultats et découvrir les masters qui correspondent
                            à vos aspirations.
                        </p>
                    </div>
                    {/* Icon */}
                    <Filter size={100} className="text-primary flex-1"/>
                </div>
            </motion.section>

            {/* Section 3: Trouver ses Motivations */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                variants={sectionVariants}
                className="mb-16"
            >
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                    3. Identifier ses Motivations
                </h2>
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                    {/* Text Content */}
                    <div className="flex-1">
                        <p className="text-white">
                            Trouver ses motivations peut parfois être difficile. Posez-vous
                            ces questions :
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-white">
                            <li>Quels sont mes intérêts personnels et professionnels ?</li>
                            <li>Quel domaine me passionne le plus ?</li>
                            <li>Quels objectifs de carrière ai-je à moyen et long terme ?</li>
                        </ul>
                    </div>
                    {/* Icon */}
                    <Lightbulb size={100} className="text-primary flex-1"/>
                </div>
            </motion.section>

            {/* Section 4: Conseils pour l'Orientation */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                variants={sectionVariants}
                className="mb-16"
            >
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                    4. Conseils pour Bien S'orienter
                </h2>
                <div className="flex flex-col sm:flex-row-reverse gap-6 items-center">
                    {/* Text Content */}
                    <div className="flex-1">
                        <p className="text-white">
                            Voici quelques conseils pour faire un choix éclairé :
                        </p>
                        <ul className="list-decimal list-inside mt-4 space-y-2 text-white">
                            <li>Consultez les débouchés professionnels des masters.</li>
                            <li>Échangez avec des étudiants ou des diplômés pour leur retour
                                d'expérience.
                            </li>
                            <li>Testez vos intérêts avec des stages ou des projets académiques.</li>
                        </ul>
                    </div>
                    {/* Icon */}
                    <Compass size={100} className="text-primary flex-1"/>
                </div>
            </motion.section>
            <FooterHome/>
        </div>
    );
}

const LegalPage = () => {
    const sectionVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0},
    };

    const transitionSettings = {duration: 0.5, ease: "easeInOut"};
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sectionVariants}
            transition={transitionSettings}
            className="container mx-auto py-10 px-4 sm:px-6 lg:px-8"
        >
            <motion.h1
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: "easeInOut"}}
                className="text-3xl font-bold text-primary text-center mb-8"
            >
                Mentions Légales
            </motion.h1>

            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                className="mb-8"
            >
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    1. Éditeurs du site
                </h2>
                <p className="text-white">
                    Ce site a été conçu et réalisé par un groupe de deux étudiants en 2ᵉ
                    année de BUT MMI (Métiers du Multimédia et de l’Internet) à l’IUT de
                    Laval :
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-white">
                    <li>Étudiant 1 : HONORE Teremana.</li>
                    <li>Étudiant 2 : ARNOULD Valentin.</li>
                </ul>
                <p className="text-white mt-4">
                    Ce projet est réalisé dans le cadre d’un exercice académique. Le
                    contenu et les fonctionnalités sont donc à but pédagogique et non
                    commercial.
                </p>
            </motion.section>

            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                className="mb-8"
            >
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    2. Hébergement
                </h2>
                <p className="text-white">Le site est hébergé par :</p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-white">
                    <li>Nom de l’hébergeur : OVH, Scaleway, ou autre.</li>
                    <li>Adresse : Exemple, 2 rue Kellermann, 59100 Roubaix, France.</li>
                    <li>Téléphone : 09 72 10 10 07 (ou autre numéro selon l’hébergeur).</li>
                </ul>
            </motion.section>

            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                className="mb-8"
            >
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    3. Propriété intellectuelle
                </h2>
                <p className="text-white">
                    Tous les contenus présents sur ce site (textes, images, vidéos,
                    graphiques, logo, etc.) sont protégés par le droit d’auteur. Toute
                    reproduction, distribution, modification, ou utilisation, même
                    partielle, de ces contenus sans autorisation expresse est interdite.
                </p>
                <p className="text-white mt-4">
                    Les images utilisées peuvent être des créations des auteurs ou issues
                    de banques d’images libres de droits (pexels, unsplash, etc.), avec
                    respect des licences d’utilisation.
                </p>
            </motion.section>

            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                className="mb-8"
            >
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    4. Protection des données personnelles
                </h2>
                <p className="text-white">
                    Le site ne collecte aucune donnée personnelle de ses utilisateurs.
                    Toutes les interactions sont anonymes et destinées uniquement à un
                    usage académique.
                </p>
                <p className="text-white mt-4">
                    En cas d’évolution future du site et de collecte de données, les
                    utilisateurs seront informés et un consentement explicite sera requis
                    conformément au RGPD (Règlement Général sur la Protection des Données).
                </p>
            </motion.section>

            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                className="mb-8"
            >
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    5. Responsabilité
                </h2>
                <p className="text-white">
                    Les éditeurs ne sauraient être tenus responsables en cas de dommages
                    directs ou indirects liés à l’utilisation du site. Le contenu du site
                    est fourni à titre informatif et pédagogique, sans garantie d’exactitude.
                </p>
            </motion.section>

            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                className="mb-8"
            >
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    6. Contact
                </h2>
                <p className="text-white">
                    Pour toute question ou demande d’information, vous pouvez nous
                    contacter à l’adresse suivante :
                </p>
                <p className="text-white mt-4 font-semibold">exemple@email.com</p>
            </motion.section>
            <FooterHome/>
        </motion.div>
    )
}

const PrivacyPage = () => {
    const sectionVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0},
    };

    const transitionSettings = {duration: 0.5, ease: "easeInOut"};
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sectionVariants}
            transition={transitionSettings}
            className="container mx-auto py-10 px-4 sm:px-6 lg:px-8"
        >
            <motion.h1
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: "easeInOut"}}
                className="text-3xl font-bold text-primary text-center mb-8"
            >
                Politique de Confidentialité
            </motion.h1>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                variants={sectionVariants}
                className="mb-8"
            >
                <p className="text-white">
                    Votre vie privée est importante pour nous. Cette politique de
                    confidentialité explique comment nous collectons, utilisons et protégeons vos
                    données personnelles lors de l'utilisation de notre site.
                </p>
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                variants={sectionVariants}
                className="mb-8"
            >
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    1. Données collectées
                </h2>
                <p className="text-white">
                    Nous ne collectons actuellement aucune donnée personnelle via ce site.
                    Toutes les interactions sont anonymes et strictement académiques.
                    Cependant, si des formulaires de contact ou d'inscription sont ajoutés
                    à l'avenir, les données suivantes pourraient être collectées :
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-white">
                    <li>Nom et prénom</li>
                    <li>Adresse e-mail</li>
                    <li>Données liées à votre navigation (cookies, adresse IP)</li>
                </ul>
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                variants={sectionVariants}
                className="mb-8"
            >
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    2. Utilisation des données
                </h2>
                <p className="text-white">
                    Si des données sont collectées à l'avenir, elles seront utilisées pour :
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-white">
                    <li>Fournir les services demandés</li>
                    <li>Améliorer l'expérience utilisateur sur le site</li>
                    <li>Analyser les performances et l'utilisation du site</li>
                </ul>
                <p className="text-white mt-4">
                    Vos données ne seront jamais partagées ou vendues à des tiers sans
                    votre consentement explicite.
                </p>
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                variants={sectionVariants}
                className="mb-8"
            >
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    3. Cookies
                </h2>
                <p className="text-white">
                    Nous utilisons des cookies pour améliorer votre expérience sur le site.
                    Les cookies sont de petits fichiers stockés sur votre appareil qui nous
                    permettent de :
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-white">
                    <li>Analyser le trafic et les performances</li>
                    <li>Stocker vos préférences d'utilisateur</li>
                </ul>
                <p className="text-white mt-4">
                    Vous pouvez configurer votre navigateur pour bloquer ou supprimer les
                    cookies à tout moment.
                </p>
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                variants={sectionVariants}
                className="mb-8"
            >
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    4. Sécurité des données
                </h2>
                <p className="text-white">
                    Nous mettons en œuvre des mesures techniques et organisationnelles pour
                    protéger vos données contre tout accès non autorisé, perte ou
                    modification. Cependant, aucun système n'est totalement sécurisé. En
                    cas de problème, nous vous informerons rapidement et prendrons les
                    mesures nécessaires.
                </p>
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                variants={sectionVariants}
                className="mb-8"
            >
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    5. Vos droits
                </h2>
                <p className="text-white">
                    Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-white">
                    <li>Accès à vos données personnelles</li>
                    <li>Rectification ou suppression de vos données</li>
                    <li>Opposition à leur traitement</li>
                </ul>
                <p className="text-white mt-4">
                    Pour exercer vos droits, contactez-nous à l'adresse suivante :
                    <span className="font-semibold">exemple@email.com</span>.
                </p>
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={transitionSettings}
                variants={sectionVariants}
                className="mb-8"
            >
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    6. Contact
                </h2>
                <p className="text-white">
                    Pour toute question concernant cette politique de confidentialité, vous
                    pouvez nous contacter à l'adresse suivante :
                </p>
                <p className="text-white mt-4 font-semibold">exemple@email.com</p>
            </motion.section>
            <FooterHome/>
        </motion.div>
    );
};

const CandidatPage = () => {
    return (
        <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -10}}
            transition={{duration: 0.5, ease: "easeInOut"}}
            className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
        >
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
                Les candidatures ne sont pas encore ouvertes
            </h1>
            <p className="text-lg text-white max-w-lg mb-10">
                La campagne de candidatures ouvrira prochainement. Restez informé pour
                connaître les dates exactes et les étapes à suivre.
            </p>

            <CalendarX size={120} className="text-primary mb-6"/>

            <p className="text-md text-gray-400">
                Revenez bientôt pour soumettre votre candidature.
            </p>
        </motion.div>
    )
}

export {HomePage, SearchPage, MasterPage, FAQpage, InformPage, LegalPage, PrivacyPage, CandidatPage};