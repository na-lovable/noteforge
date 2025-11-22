import { Logout } from "./logout";
import { OrgSelect } from "./org-select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { UserInfoCard } from "./user-info-card";

interface PageWrapperProps {
  children: React.ReactNode;
  breadcrumbs: {
    label: string;
    path: string;
  }[];
}

export default function PageWrapper({
  children,
  breadcrumbs,
}: PageWrapperProps) {
  return (
    <div>
      <header className="bg-background sticky top-0 flex h-10 shrink-0 items-center gap-2 border-b px-4 justify-between">
        <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => {
              if (index != breadcrumbs.length - 1) {
                return (
                  <div
                    key={item.label}
                    className="flex h-10 items-center"
                  >
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href={item.path}>
                        {item.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </div>
                );
              } else {
                return (
                  <div key={item.label}>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                  </div>
                );
              }
            })}
          </BreadcrumbList>
        </Breadcrumb>
        </div>
        <OrgSelect />
        <UserInfoCard />
        <Logout />
      </header>
      {children}
    </div>
  );
}
