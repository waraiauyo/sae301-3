import {SearchPage} from "@/components/pages";
import {getMasters} from "@/lib/data";

export default async function index({searchParams}) {
    const trainings = await getMasters();
    return <SearchPage trainings={trainings} params={searchParams.q}/>;
}