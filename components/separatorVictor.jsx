import { Separator } from "@/components/ui/separator"
import {Card, CardContent, CardDescription, CardFooter, CardTitle} from "@/components/ui/card";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";

const SeparatorNumbers = () => {
    return (
        <div className="mt-10">
            <div className="flex flex-row text-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Quelques chiffres
                </p>
            </div>
            <Separator className="my-4" />
            <div className="flex gap-4 items-center space-x-4 text-sm justify-center text-center mt-10">
                <div className="flex flex-col items-center justify-center w-fit">
                    <span className="font-black text-8xl text-primary">3600</span>
                    <p className="text-lg">Masters en France.</p>
                </div>
                <Separator orientation="horizontal" className="rotate-90 w-[100px]" />
                <div className="flex flex-col items-center justify-center w-fit">
                    <span className="font-black text-8xl text-primary">+ 3M</span>
                    <p className="text-lg text-center">Inscrits en enseignement supérieur en 2023.</p>
                </div>
                <Separator orientation="horizontal" className="rotate-90 w-[100px]"/>
                <div className="flex flex-col items-start justify-center w-fit">
                    <span className="font-black text-8xl text-primary">64%</span>
                    <p className="text-lg">De taux de réussite en 2023.</p>
                </div>
            </div>
        </div>
    );
}

const SeparatorCards = () => {
    return (
        <div className="mt-10">
            <Separator className="my-4"/>
            <div className="flex gap-4 items-center space-x-4 text-sm justify-center text-center mt-10 mx-2">
                <div className="flex flex-col items-center justify-center">
                    <Card className="text-pretty basis-1/3 px-4 pt-6">
                        <CardTitle>
                            <p className="font-black text-xl text-start pb-2">AVEC QUI ÉCHANGER SUR VOTRE PROJET DE MASTER ?</p>
                        </CardTitle>
                        <CardDescription className="text-start">
                            Différents services vous sont proposés par MSTR pour un accompagnement à l'orientation personnalisée et gratuit. Vos démarches pour mieux connaître les formations sont importantes.
                        </CardDescription>
                        <CardContent>

                        </CardContent>
                        <CardFooter className="flex flex-row justify-end">
                            <Button>En savoir plus <ArrowRight size={20}/></Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="flex flex-col items-center justify-center w-fit">
                    <Card className="text-pretty basis-1/3 px-4 pt-6">
                        <CardTitle>
                            <p className="font-black text-xl text-start pb-2">COMMENT S'INFORMER SUR LES FILIÈRES ET LES DÉBOUCHÉS ?</p>
                        </CardTitle>
                        <CardDescription className="text-start">
                            L'élaboration de votre projet d'orientation est un cheminement : elle s'effectue de manière progressive tout au long des études supérieurs.
                        </CardDescription>
                        <CardContent>

                        </CardContent>
                        <CardFooter className="flex flex-row justify-end">
                            <Button>En savoir plus <ArrowRight size={20}/></Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="flex flex-col items-start justify-center w-fit">
                    <Card className="text-pretty basis-1/3 px-4 pt-6">
                        <CardTitle>
                            <p className="font-black text-xl text-start pb-2">COMMENT CHOISIR LES FILTRES DE RECHERCHE LES PLUS PERTINENTS ?</p>
                        </CardTitle>
                        <CardDescription className="text-start">
                            Pour faciliter la recherche des utilisateurs, il est essentiel de proposer des filtres adaptés à leurs besoins. Les filtres les plus pertinents incluent le domaine d'étude, la localisation de la formation, le taux d'insertion professionnelle, la durée du master ou encore les débouchés professionnels.
                        </CardDescription>
                        <CardContent>

                        </CardContent>
                        <CardFooter className="flex flex-row justify-end">
                            <Button>En savoir plus <ArrowRight size={20}/></Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export {SeparatorNumbers, SeparatorCards}