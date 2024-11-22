import {TrainingPage} from "@/components/pages";
import {training} from "@/lib/data-management";

export default async function index() {
    const data = await training();
    
    return <TrainingPage training={data}/>;
}