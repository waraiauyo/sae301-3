import {clsx} from "clsx";
import {twMerge} from "tailwind-merge"

export const cn = (...inputs) => twMerge(clsx(inputs));

export const getKeyFromObject = (data, key) => { //Fonction pour avoir chaque élément d'un objet sans avoir mille fois la même ville par exemple.
    const occurrences = {};
    const result = [];

    if (data) {
        data.forEach(element => {
            let keyElement = element[key];
            occurrences[keyElement] = (occurrences[keyElement] || 0) + 1;
        });

        for (const [key, value] of Object.entries(occurrences)) {
            if (key !== "null" && key !== null) result.push({value: key, count: value});
        }

        return result;
    } else return null;
};