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
        <nav ref={ref} className={"bg-background border-b flex py-4 px-6 items-center sticky top-0 z-20"}>
            <Link href={"/"} className={"text-3xl font-black text-primary basis-1/4"}>LOGO</Link>
            <div className={"flex basis-1/2 justify-center gap-2"}>
                {
                    links.map((link, i) => (
                        <Link key={i} href={link.href} asChild>
                            <Button className={cn(pathname === link.href && "bg-accent")}
                                    variant={"ghost"}>{link.title}</Button>
                        </Link>
                    ))
                }
            </div>
            <div className={"flex justify-end basis-1/4"}>
                <Link href={"/auth"} asChild>
                    <Button>Se connecter</Button>
                </Link>
            </div>
        </nav>
    );
});

export {Navbar};