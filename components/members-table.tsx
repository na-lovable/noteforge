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
import RemoveMemberButton from "./remove-member-button";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function MembersTable({orgData} : { orgData: FullOrganizationType}) {
  return (
    <Table>
      <TableCaption>Member for {orgData?.name}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Organization</TableHead>
          <TableHead>Member Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined on</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orgData?.members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium">{orgData.name}</TableCell>
            <TableCell>{member.user.name}</TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell className="text-right">{member.createdAt.toDateString()}</TableCell>
            <TableCell className="text-right">
              <RemoveMemberButton memberId={member.id} orgId={orgData.id}>Delete</RemoveMemberButton>
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
