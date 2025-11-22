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
import { TeamMember } from "@/db/schema";
import RemoveTeamMemberButton from "./remove-team-member-button";

type TeamMembersTableProps = {
  teamMembersList: TeamMember[];
};

export default function TeamMembersTable({
  teamMembersList,
}: TeamMembersTableProps) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teamMembersList.map((teamMember) => (
          <TableRow key={teamMember.id}>
            <TableCell className="font-medium">{teamMember.id}</TableCell>
            <TableCell>{}</TableCell>
            <TableCell>{}</TableCell>
            <TableCell className="text-right">
              <RemoveTeamMemberButton
                userId={teamMember.userId}
                teamId={teamMember.teamId}
              />
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
