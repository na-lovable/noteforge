import {
  CalendarIcon,
  SquareUserRound,
  SquareUserRoundIcon,
  User,
  User2,
  UserRoundIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function UserInfoCard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const currentUser = session?.user;
  const currentSession = session?.session;
  const orgList = await auth.api.listOrganizations({
    // This endpoint requires session cookies.
    headers: await headers(),
  });

  const activeOrgId = currentSession?.activeOrganizationId ?? undefined;
  const fullActiveOrg = await auth.api.getFullOrganization({
    query: {
      organizationId: activeOrgId,
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  const activeTeamId = currentSession?.activeTeamId;
  const activeMember = await auth.api.getActiveMember({
    // This endpoint requires session cookies.
    headers: await headers(),
});
const activeOrgTeams = await auth.api.listOrganizationTeams({
    query: {
        // organizationId: "organization-id",
    },
    headers: await headers(),
});
const activeTeamName = activeOrgTeams.filter((team) => (team.id === activeTeamId))[0].name;
const userTeams = await auth.api.listUserTeams({
    // This endpoint requires session cookies.
    headers: await headers(),
});
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          {currentUser?.image ? currentUser.image : <UserRoundIcon />}{" "}
          {currentUser?.name}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{currentUser?.name}</h4>
            <div className="text-muted-foreground text-xs">
              Joined on: {currentUser?.createdAt.toLocaleDateString()}
            </div>
            <div className="text-muted-foreground text-xs">
              User role: {currentUser?.role}
            </div>
            <div className="text-muted-foreground text-xs">
              User Org Count: {orgList.length}:
            </div>
            <div className="text-muted-foreground text-xs">
              Active Org Name: {fullActiveOrg?.name}:
            </div>
            <div className="text-muted-foreground text-xs">
              Active org Members Count: {fullActiveOrg?.members.length}
            </div>
            <div className="text-muted-foreground text-xs">
              Active org Member Name: {activeMember?.user.name}
            </div>
            <div className="text-muted-foreground text-xs">
              Active org Member Role: {activeMember?.role}
            </div>
            <div className="text-muted-foreground text-xs">
              Active org Teams Count: {activeOrgTeams.length}
            </div>
            <div className="text-muted-foreground text-xs">
              Active user's Teams Count: {userTeams.length}
            </div>
            <div className="text-muted-foreground text-xs">
              Active Team Name: {activeTeamName}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
