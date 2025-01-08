import Fuse from "fuse.js";

export const getKeyFromObject = (data, key) => {
    // Fonction pour obtenir les clés uniques d'un objet (comme les villes)
    const occurrences = {};
    const result = [];

    if (data) {
        data.forEach((element) => {
            let keyElement = element[key];
            occurrences[keyElement] = (occurrences[keyElement] || 0) + 1;
        });

        for (const [key] of Object.entries(occurrences)) {
            if (key !== "null" && key !== null) result.push(key);
        }

        return result;
    } else return null;
};

// Fonction pour effectuer une recherche sur les formations
export const searchTrainings = (trainings, query, city) => {
    let trainingsFiltered = trainings;

    // Filtrer par ville si spécifiée
    if (city) {
        trainingsFiltered = trainings.filter((training) => training.ville === city);
    }

    // Recherche dans les parcours avec Fuse.js
    const fuse = new Fuse(trainingsFiltered, { keys: ["parcours"], threshold: 0.3 });
    const results = fuse.search(query);

    return results.map((result) => result.item);
};
