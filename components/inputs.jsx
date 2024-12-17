"use client"

import {forwardRef} from "react";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {Search} from "lucide-react";

const SearchInput = forwardRef(({search, setSearch, className}, ref) => {
    return (
        <div className={"relative h-fit"}>
            <Search className={"absolute my-auto left-3 top-3.5 text-muted-foreground"} size={20}/>
            <Input ref={ref} className={cn("h-12 pl-10", className)}
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   placeholder={"Rechercher une formation"}/>
        </div>
    );
});

export {SearchInput};