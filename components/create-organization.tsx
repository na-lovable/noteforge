"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { createOrg } from "@/server/organizations";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Org name must be at least 5 characters.")
    .max(32, "Org name must be at most 32 characters."),
  slug: z
    .string()
    .regex(/^[a-zA-Z0-9-]+$/, "Org slug can only be alphanumeric with hyphen")
    .min(5, "Org slug must be at least 5 characters.")
    .max(32, "Org slug must be at most 100 characters."),
});

export function CreateOrganization() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  async function onSubmitOrgForm(data: z.infer<typeof formSchema>) {
    setIsCreating(true);
    setIsOpen(true);
    const response = await createOrg(data);
    if (!response.success) {
      toast.error(response.message);
      setIsCreating(false);
      setIsOpen(false);
    } else {
      toast.success(response.message);
      setIsCreating(false);
      setIsOpen(false);
      router.refresh();
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Organization</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Create an Organization by providing the details below.
          </DialogDescription>
        </DialogHeader>
        <form id="createOrg" onSubmit={form.handleSubmit(onSubmitOrgForm)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Organization Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Wonderful Corp"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="slug"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="slug">Organization Name</FieldLabel>
                  <Input
                    {...field}
                    id="slug"
                    aria-invalid={fieldState.invalid}
                    placeholder="Corp slug"
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
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="createOrg">
            {isCreating ? (
              <>
              <Spinner /> Creating org ...
              </> ) : (
                "Create Organization"
                )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
