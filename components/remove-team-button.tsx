"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { removeOrgTeam } from "@/server/organizations";

interface RemoveTeamButtonProps {
  teamId: string;
  //   orgId: string;
}

export default function RemoveTeamButton({
  teamId,
  //   orgId,
  children,
}: React.PropsWithChildren<RemoveTeamButtonProps>) {
  const [isRemoving, setIsRemoving] = useState(false);
  const router = useRouter();
  async function handleRemoveTeam() {
    try {
      setIsRemoving(true);
      const response = await removeOrgTeam(teamId);
      setIsRemoving(false);
      response.success && router.refresh();
      toast.message(response.message);
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <Button onClick={handleRemoveTeam} disabled={isRemoving}>
      {isRemoving ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
