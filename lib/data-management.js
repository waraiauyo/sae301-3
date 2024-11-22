"use server"

import {getKeyFromObject} from "@/lib/utils";

const api = {
    training: "https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/formations",
};

export const training = async () => {
    let data = await fetch(api.training, {cache: "no-store"}).then(res => res.json()); //On récupère les datas

    return {
        all: data,
        citys: getKeyFromObject(data, "ville"),
    }
}