import { User } from "@/db/schema";
import { Button } from "./ui/button";
import AddMemberButton from "./add-member-button";
import { UserWithRole } from "better-auth/plugins";

interface AllUsersProps {
  users: UserWithRole[];
  organizationId: string;
}

export default function AllUsers({ users, organizationId }: AllUsersProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold">All Users</h2>
      <div className="flex flex-col gap-2">
        {users.length>0? (
          users.map((user) => (
            <div key={user.id}>
              {user.name}{" "}
              <AddMemberButton user={user} organizationId={organizationId}>
                Add Member
              </AddMemberButton>
            </div>
          ))
        ) : (
          <div>No users to add</div>
        )}
      </div>
    </div>
  );
}
