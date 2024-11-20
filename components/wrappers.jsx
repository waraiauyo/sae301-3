"use client"

import {cn} from "@/lib/utils";
import {forwardRef} from "react";

const Main = forwardRef(({user, className, children, ...props}, ref) => (
    <main ref={ref} className={cn("flex flex-col", className)} {...props}>{children}</main>
));

const Section = forwardRef(({className, children, ...props}, ref) => (
    <section ref={ref} className={cn("pt-6 pb-6 pl-6 pr-6", className)} {...props}>{children}</section>
));

export {Main, Section};