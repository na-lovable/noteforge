"use client";

import { Loader2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { removeTeamMemberAction } from "@/server/organizations";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";

type RemoveTeamMemberButtonProps = {
  userId: string;
  teamId: string;
};

export default function RemoveTeamMemberButton({
  userId,
  teamId,
}: RemoveTeamMemberButtonProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const router = useRouter();
  async function handleRemove() {
    setIsRemoving(true);
    try {
      const response = await removeTeamMemberAction({
        userId: userId,
        teamId: teamId,
      });
      if (response.success) {
        toast.success(response.message);
        router.refresh();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("API Error: ");
    } finally {
      setIsRemoving(false);
    }
  }
  return (
    <Button variant="destructive" disabled={isRemoving} onClick={handleRemove}>
      {isRemoving ? <Spinner /> : <Trash2 />}
    </Button>
  );
}
