"use client"

import {forwardRef} from "react";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useRouter, useSearchParams} from "next/navigation";

const MasterSearchInput = forwardRef(({}, ref) => {
    const router = useRouter();
    const params = useSearchParams();
    const query = params.get("q");

    const formSchema = z.object({
        search: z.string({message: "Vous devez entrer un élément de recherche."}).min(1, {message: "Vous devez entrer un élément de recherche."}),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: query,
        }
    });

    const onSubmit = (values) => router.push(`/search?q=${values.search}`);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"flex gap-2 w-full"}>
                <FormField
                    control={form.control}
                    name="search"
                    render={({field}) => (
                        <FormItem className={"w-full"}>
                            <FormControl>
                                <Input className={"h-10"} ref={ref} autoComplete={"off"}
                                       placeholder={"Entrez une ville"}
                                       {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
});

export {MasterSearchInput};