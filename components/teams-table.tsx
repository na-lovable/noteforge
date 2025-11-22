import { getOrgTeams } from "@/server/organizations";
import RemoveTeamButton from "./remove-team-button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FullOrganizationType } from "@/server/organizations";
import { UpdateTeamDialog } from "./update-team";
import { SelectTeamMember } from "./select-team-member";
import { getAllUsers } from "@/server/users";
import TeamMemberCount from "./team-member-count";
import Link from "next/link";
import SetActiveTeam from "./set-active-team-button";

export async function TeamsTable({
  orgData,
}: {
  orgData: FullOrganizationType;
}) {
  const allUsers = await getAllUsers();
  if (!orgData) {
    return <>Unable to fetch org</>;
  }
  const response = await getOrgTeams(orgData?.id);
  if (!response.success) {
    return <>Unable to fetch teams</>;
  } else if (response.teams) {
    const teamList = response.teams;
    return (
      <Table>
        <TableCaption>Teams in the org: {orgData.name}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Organization</TableHead>
            <TableHead>Team Name</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Created on</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamList.map((team) => (
            <TableRow key={team.id}>
              <TableCell className="font-medium">{orgData.name}</TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/organization/${orgData.slug}/team/${team.id}`}
                >
                  {team.name}
                </Link>
              </TableCell>
              <TableCell>
                <TeamMemberCount teamid={team.id} />
              </TableCell>
              <TableCell className="text-right">
                {team.createdAt.toDateString()}
              </TableCell>
              <TableCell className="text-right flex items-end gap-2 justify-end">
                <SetActiveTeam teamId={team.id}/>
                <SelectTeamMember users={allUsers} teamId={team.id} />
                <UpdateTeamDialog teamId={team.id} teamName={team.name} />
                <RemoveTeamButton teamId={team.id}>Delete</RemoveTeamButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}
