import AllUsers from "@/components/all-users";
import { CreateTeamDialog } from "@/components/create-team";
import { MembersTable } from "@/components/members-table";
import PageWrapper from "@/components/page-wrapper";
import TeamsList from "@/components/teams-list";
import { TeamsTable } from "@/components/teams-table";
import { getOrgBySlug } from "@/server/organizations";
import { canRemoveMemeber, getAllUsers, getCurrentUser } from "@/server/users";

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const response = await getOrgBySlug(slug);
  const users = await getAllUsers();
  const nonMemberUsers = users.filter(
    (user) =>
      !response.orgData?.members.some((member) => member.userId === user.id)
  );
  const currentUser = await getCurrentUser();
  const permission = await canRemoveMemeber();
  return (
    <PageWrapper
    breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        { label: slug, path: `/dashboard/organization/${slug}` }
    ]}>
    <div>
      {response.orgData ? (
        <div>
          <MembersTable orgData={response.orgData} />
          <AllUsers
            users={nonMemberUsers}
            organizationId={response.orgData?.id}
          />
          <h1>
            {currentUser?.name}{" "}
            {permission ? "can remove a member" : "cannot remove a member"}
          </h1>
          <CreateTeamDialog/>
        </div>
      ) : (
        <p>Couldn't fetch org</p>
      )}
      {/* <TeamsList /> */}
      <TeamsTable orgData={response.orgData} />
    </div>
    </PageWrapper>
  );
}
