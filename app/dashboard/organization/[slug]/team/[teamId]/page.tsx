import PageWrapper from "@/components/page-wrapper";
import TeamMembersTable from "@/components/team-members-table";
import { listTeamMembersAction } from "@/server/organizations";

type TeamPageProps = {
  params: Promise<{ teamId: string }>;
};

export default async function TeamPage({ params }: TeamPageProps) {
  const { teamId } = await params;
  const response = await listTeamMembersAction(teamId);
  const teamMembersList = response.teamMembers;
  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", path: "/dashboard" }]}>
      {teamMembersList && (
        <TeamMembersTable teamMembersList={teamMembersList}></TeamMembersTable>
      )}
    </PageWrapper>
  );
}
