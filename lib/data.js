export const getMasters = async () => {
    const r = await fetch("https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/formations", {cache: "no-store"}).then((res) => res.json());

    return Array.from(r);
}

export const getMasterByIfc = async (ifc) => {
    const master = await fetch(`https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/formations/${ifc}?full-details=1`).then((res) => res.json());

    const test = await fetch("https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/stats/search", {
        method: "POST",
        body: JSON.stringify({
            filters:{
                formationIfcs: ifc,
            },
        }),
    }).then(res => res.json());

    return test;
}