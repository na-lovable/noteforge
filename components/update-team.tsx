"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createOrgTeam, updateTeamAction } from "@/server/organizations";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Team name must be at least 5 characters.")
    .max(32, "Team name must be at most 32 characters."),
});

export function UpdateTeamDialog({ teamId, teamName }: { teamId: string , teamName: string}) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsUpdating(true);
    setIsOpen(true);
    try {
      const response = await updateTeamAction({
        teamId: teamId,
        teamNewName: data.name,
      });
      if (response.success) {
        toast.success(response.message);
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Unexpected error: ", error);
      toast.error("An unexpected error occured");
    } finally {
      setIsUpdating(false);
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Update Team</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Update name for team: {teamName}
            </DialogTitle>
            <DialogDescription>
              Update team here. Give it a new name.
            </DialogDescription>
          </DialogHeader>
          <form id="update-team-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Team Name</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="New team name"
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
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="update-team-form" disabled={isUpdating}>
              {isUpdating ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Update team name"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
