"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import * as z from "zod"

import { Button } from "./ui/button"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createNotebook } from "@/server/notebooks"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useState } from "react"
import { Input } from "./ui/input"

const formSchema = z.object({
    name: z
        .string()
        .min(5, "Notebook name must be at least 5 characters.")
        .max(32, "Notebook name must be at most 32 characters."),
})

export function CreateNotebook() {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const userId = (await authClient.getSession()).data?.user.id;
        if (!userId) {
            toast.error("You must be logged in to create a notebook");
            return;
        }
        const response = await createNotebook({
            ...values,
            userId,
        });
        if (response.success) {
            form.reset();
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Notebook</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new notebook</DialogTitle>
                    <DialogDescription>
                        Provide the name of the notebook to create a new noteboook.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} id="create-notebook-form">
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="name">
                                        Notebook Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="My Note"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button 
                        type="submit"
                        form="create-notebook-form"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating..." : "Create Notebook"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}