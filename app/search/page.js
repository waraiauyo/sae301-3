import {SearchPage} from "@/components/pages";
import {getTrainings} from "@/lib/data";

export default async function index({searchParams}) {
    const trainings = await getTrainings();
    return <SearchPage trainings={trainings} params={searchParams.q}/>;
}