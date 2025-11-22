"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/db/schema";
import { addTeamMemberAction } from "@/server/organizations";
import { toast } from "sonner";

type SelectTeamMemberProps = {
  users: User[];
  teamId: string;
};

export function SelectTeamMember({ users, teamId }: SelectTeamMemberProps) {
  async function handleSelect(userId: string) {
    console.log("called member select");
    const response = await addTeamMemberAction({ teamId: teamId, userId: userId });
    console.log(response.message);
    toast.message(response.message);
  }
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Add Member" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Users</SelectLabel>
          {users.map((user, i) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
