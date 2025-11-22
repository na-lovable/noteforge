"use client";

import { User } from "@/db/schema";
import { Button } from "./ui/button";
import { addOrgMember } from "@/server/organizations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { UserWithRole } from "better-auth/plugins";

interface AddMemberButtonProps {
  user: UserWithRole;
  organizationId: string;
}

export default function AddMemberButton({
  user,
  organizationId,
  children,
}: React.PropsWithChildren<AddMemberButtonProps>) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  async function handleAddMember() {
    try {
      setIsAdding(true);
      const response = await addOrgMember({
        userId: user.id,
        orgId: organizationId,
      });
      if (response.success) {
        setIsAdding(false);
        router.refresh();
        toast.message(response.message);
      } else {
        toast.error(response.message);
        setIsAdding(false);
      }
    } catch (error) {
      const e = error as Error;
      toast.error(e.message);
      setIsAdding(false);
    }
  }
  return (
    <Button onClick={handleAddMember} disabled={isAdding}>
      {isAdding? <Loader2 className="animate-spin"/> : children}
    </Button>
  );
}
