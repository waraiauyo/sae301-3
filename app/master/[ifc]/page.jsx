import {getMasterByIfc} from "@/lib/data";
import {MasterPage} from "@/components/pages";

export default async function ({params}){
    const master = await getMasterByIfc(params.ifc);

    return <MasterPage master={master}/>;
}