"use client";

import { authClient } from "@/lib/auth-client";

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
import { useRouter } from "next/navigation";

export function OrgSelect() {
  const router = useRouter();
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { data: organizations } = authClient.useListOrganizations();

  async function handleChangeOrg(orgId: string) {
    const { data, error } = await authClient.organization.setActive({
      organizationId: orgId,
    });
    router.refresh();
  }

  return (
    <Select onValueChange={handleChangeOrg} value={activeOrganization?.id}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={activeOrganization?.name}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Organizations</SelectLabel>
          {organizations?.map((org, i) => (
            <SelectItem key={i} value={org.id}>
              {org.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
