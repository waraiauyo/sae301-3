import {clsx} from "clsx";
import {twMerge} from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function firstLetterUppercase(input) {
    input = input.toLowerCase();
    return input.charAt(0).toUpperCase() + input.slice(1);
}