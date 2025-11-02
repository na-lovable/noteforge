import { CreateNotebook } from "@/components/create-notebook";
import { Logout } from "@/components/logout";
import Notebooks from "@/components/notebooks";
import PageWrapper from "@/components/page-wrapper";

export default function Page() {
  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", path: "/dashboard" }]}>
      <div className="p-2 m-2 space-y-2">
        <h1 className="text-2xl">Dashboard</h1>
        <CreateNotebook />
      </div>
      <Notebooks className="p-4"/>
    </PageWrapper>
  );
}
