"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface RemoveMemberButtonProps {
  memberId: string;
  orgId: string;
}

export default function RemoveMemberButton({
  memberId,
  orgId,
  children,
}: React.PropsWithChildren<RemoveMemberButtonProps>) {
  const [isRemoving, setIsRemoving] = useState(false);
  const router = useRouter();
  async function handleRemoveMember() {
    setIsRemoving(true);
    const { data, error } = await authClient.organization.removeMember({
      memberIdOrEmail: memberId, // required
      organizationId: orgId,
    });
    setIsRemoving(false);
    router.refresh();
    toast.error(error?.message);
  }
  return (
    <Button onClick={handleRemoveMember} disabled={isRemoving}>
      {isRemoving ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
