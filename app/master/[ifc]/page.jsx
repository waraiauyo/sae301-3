import {getMasterByIfc} from "@/lib/data";

export default async function ({params}){
    const master = await getMasterByIfc(params.ifc);

    return <>{JSON.stringify(master)}</>
}