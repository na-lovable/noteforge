"use client";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import Link from "next/link";
// import { headers } from "next/headers";

export function OrgList() {
  const { data: organizations } = authClient.useListOrganizations();
  return (
    <div className="grid grid-cols-1 items-center gap-4">
      {organizations?.map((org, i) => (
        <div key={i} className="ml-4 flex gap-2 items-center">
          <span>{i + 1}. </span>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/organization/${org.slug}`}>{org.name}</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
