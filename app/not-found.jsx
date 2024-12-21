"use client"

import {Section} from "@/components/wrappers";

export default function NotFound() {
    return (
        <Section className={"h-[calc(100vh-68px)] flex justify-center items-center"}>
            <span className={"text-3xl font-bold"}>Cette page n'est pas encore accessible.</span>
        </Section>
    );
}