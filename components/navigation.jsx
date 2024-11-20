"use client"

import {usePathname} from "next/navigation";
import {forwardRef} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";

const Navbar = forwardRef(({}, ref) => {
    const pathname = usePathname();

    const links = [
        {title: "Les masters", href: "/masters"},
    ];

    return (
        <nav ref={ref} className={"backdrop-blur border-b flex py-4 px-6 justify-between items-center"}>
            <Link href={"/"} className={"text-2xl font-bold"}>SAE3.01 / 3.02</Link>
            <div className={"flex justify-center gap-2"}>
                {
                    links.map((link, i) => (
                        <Link key={i} href={link.href} asChild>
                            <Button className={cn(pathname === link.href && "bg-accent")}
                                    variant={"ghost"}>{link.title}</Button>
                        </Link>
                    ))
                }
            </div>
        </nav>
    );
});

export {Navbar};