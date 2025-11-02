import * as React from "react";
import { ChevronRight, File, Notebook } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getNotebooksByUser } from "@/server/notebooks";
import Image from "next/image";
import { NavItem, SidebarItems } from "./sidebar-items";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const response = await getNotebooksByUser();
  const data: NavItem[] = response.notebooks?.map((notebookItem) => ({
    title: notebookItem.name,
    url: `/dashboard/notebook/${notebookItem.id}`,
    items: notebookItem.notes.map((noteItem) => ({
      title: noteItem.title,
      url: `/dashboard/notebook/${notebookItem.id}/note/${noteItem.id}`,
      isActive: false,
    })),
  })) ?? [];
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src={"/vercel.svg"} alt="Logo" width={32} height={32} />
          <h2 className="text-2xl font-bold">Noteforge</h2>
        </div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.length > 0  && <SidebarItems data={data} /> }
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
