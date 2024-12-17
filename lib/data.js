export const getTrainings = async () => {
    const r = await fetch("https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/formations");
    return await r.json();
}