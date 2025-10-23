import { CreateNotebook } from "@/components/create-notebook";
import { Logout } from "@/components/logout";
import Notebooks from "@/components/notebooks";
import PageWrapper from "@/components/page-wrapper";

export default function Page() {
    return (
        <PageWrapper breadcrumbs={[{ label: "Dashboard", path: "/dashboard"}]}>
            <h1>Dashboard</h1>
            <Notebooks />
            <CreateNotebook />
            <Logout />
        </PageWrapper>
    )
}