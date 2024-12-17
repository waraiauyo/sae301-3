"use client"

import {forwardRef} from "react";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {Search} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";

const SearchInput = forwardRef(({className}, ref) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className={"relative h-fit"}>
            <Search className={"absolute my-auto left-3 top-3.5 text-muted-foreground"} size={20}/>
            <Input ref={ref} className={cn("h-12 pl-10", className)}
                   onChange={(e) => router.replace(`${pathname}?q=${e.target.value}`)}
                   placeholder={"Rechercher une formation"}/>
        </div>
    );
});

export {SearchInput};