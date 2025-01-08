"use client";

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const SearchInput = forwardRef(({ searchQuery, onChange, onSearch, className }, ref) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && onSearch) {
            onSearch(); // Appelle la fonction de recherche passée par la prop `onSearch`
        }
    };

    return (
        <div className={"top-[calc(68px+1.5rem)] sticky"}>
            <Search
                className={"absolute my-auto left-3 top-3.5 text-muted-foreground z-10"}
                size={20}
            />
            <Input
                ref={ref}
                className={cn("backdrop-blur-xl bg-ground/90 h-12 pl-10", className)}
                value={searchQuery}
                onChange={onChange}
                onKeyDown={handleKeyDown} // Gestion de la touche "Entrée"
                placeholder={"(Nom de la formation, mots-clés ...)"}
            />
        </div>
    );
});

export { SearchInput };
