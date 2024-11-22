"use client"

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {usePathname, useRouter} from "next/navigation";

const CitysCombobox = ({citys, createQueryString}) => {
    const router = useRouter();
    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-fit justify-between"
                >
                    {value
                        ? value
                        : "Sélectionner une ville"}
                    <ChevronsUpDown className="opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Nom de la ville" className="h-9"/>
                    <CommandList>
                        <CommandEmpty>Aucune ville trouvée.</CommandEmpty>
                        <CommandGroup>
                            {citys.map((city) => (
                                <CommandItem
                                    key={city.value}
                                    value={city.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === city ? "" : currentValue);
                                        setOpen(false);
                                        router.replace(pathname + "?" + createQueryString("city", city.value));
                                    }}
                                >
                                    {city.value}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            city === city.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export {CitysCombobox};