import { CreateNotebook } from "@/components/create-notebook";
import { CreateOrganization } from "@/components/create-organization";
import { Logout } from "@/components/logout";
import Notebooks from "@/components/notebooks";
import { OrgList } from "@/components/org-list";
import { OrgSelect } from "@/components/org-select";
import PageWrapper from "@/components/page-wrapper";

export default function Page() {
  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", path: "/dashboard" }]}>
      <div className="p-2 m-2 space-y-2">
        <h1 className="text-2xl">Dashboard</h1>
        <CreateOrganization />
        <CreateNotebook />
      </div>
      <OrgList />
      <Notebooks className="p-4" />
    </PageWrapper>
  );
}
