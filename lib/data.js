export const getTrainings = async () => {
    const r = await fetch("https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/formations", {cache: "no-store"}).then((res) => res.json());

    r.map((v, i) => {
        v.id = i;
    });

    return r;
}