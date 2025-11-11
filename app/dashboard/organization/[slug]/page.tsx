import AllUsers from "@/components/all-users";
import { MembersTable } from "@/components/members-table";
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
        </div>
      ) : (
        <p>Couldn't fetch org</p>
      )}
    </div>
  );
}
