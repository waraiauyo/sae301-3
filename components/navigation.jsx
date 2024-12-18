"use client"

import {forwardRef} from "react";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {BookOpen, ChartArea, Rotate3d, Search} from "lucide-react";
import Logo from "@/components/ui/logo";

const Navbar = forwardRef(({}, ref) => {
    const pathname = usePathname();

    const links = [
        {name: "Rechercher un master", href: "/search", icon: Search},
        {name: "S'informer", href: "/yesir", icon: Rotate3d},
        {name: "Statistiques", href: "/stats", icon: ChartArea},
    ];

    return (
        <nav ref={ref} className={"flex px-6 py-4 sticky top-0 z-20 items-center backdrop-blur-xl shadow"}>
            <div className={"basis-1/4"}>
                <Link className={"w-fit"} href={"/"}>
                    <Logo/>
                </Link>
            </div>
            <div className={"flex gap-2 basis-1/2 justify-center"}>
                {links.map((link, i) => (
                    <Link href={link.href} key={i}>
                        <Button key={i} variant={pathname === link.href ? "primary" : "outline"}>
                            {link.name}
                            <link.icon className={pathname !== link.href && "text-muted-foreground"}/>
                        </Button>
                    </Link>
                ))}
            </div>
            <div className={"flex gap-2 basis-1/4 justify-end"}>
                <Link href={"/about"}>
                    <Button>En savoir plus <BookOpen size={20}/></Button>
                </Link>
            </div>
        </nav>
    );
});

export {Navbar};