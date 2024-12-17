"use client"

import {forwardRef} from "react";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {Search} from "lucide-react";

const SearchInput = forwardRef(({searchQuery, onChange, className}, ref) => {
    return (
        <div className={"top-[calc(68px+1.5rem)] sticky"}>
            <Search className={"absolute my-auto left-3 top-3.5 text-muted-foreground z-20"} size={20}/>
            <Input ref={ref} className={cn("backdrop-blur-xl bg-ground/90 h-12 pl-10", className)}
                   value={searchQuery}
                   onChange={onChange}
                   placeholder={"Rechercher une formation"}/>
        </div>
    );
});

export {SearchInput};