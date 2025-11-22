import { listTeamMembersAction } from "@/server/organizations";
import { Badge } from "@/components/ui/badge";

export default async function TeamMemberCount({ teamid }: { teamid: string }) {
  const response = await listTeamMembersAction(teamid);
  const count = response.teamMembers?.length;
  return (
    <Badge
      className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
      variant="destructive"
    >
      {count}
    </Badge>
  );
}
