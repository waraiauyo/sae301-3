import {SearchPage} from "@/components/pages";

export default async function index({searchParams}) {
    return <SearchPage params={searchParams.q}/>;
}