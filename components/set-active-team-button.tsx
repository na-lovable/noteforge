"use client";

import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

export default function SetActiveTeam({ teamId }: { teamId: string }) {
  const setActiveTeam = async () => {
    const { data, error } = await authClient.organization.setActiveTeam({
    teamId: teamId,
});
  };
  return <Button onClick={setActiveTeam}>Make Active</Button>;
}
