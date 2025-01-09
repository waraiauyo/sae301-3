export const getMasters = async () => {
    let r = await fetch("https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/formations", {
        cache: "no-store"
    }).then(async (res) => Array.from(await res.json()));

    r = r.filter((r) => r.parcours !== "");

    return r;
}

export const getMasterByIfc = async (ifc) => {
    const master = await fetch(`https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/formations/${ifc}?full-details=1`).then((res) => res.json());

    const stats = await fetch("https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/stats/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            filters: {
                formationIfcs: master.ifc,
                etablissementIds: master.etabUai,
                mentionIds: master.mentionId,
                annees: 2023,
            }
        })
    }).then((res) => res.json());

    master.lastYearApplication = stats.candidatures[0];
    console.log(master)

    return master;
}