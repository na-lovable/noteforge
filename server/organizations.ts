"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export interface OrgValues {
  name: string;
  slug: string;
}

export async function createOrg(values: OrgValues) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user.id;
    if (!userId) {
      return {
        success: false,
        message: "Please log in to create an organization",
      };
    }
    const data = await auth.api.createOrganization({
      body: {
        name: values.name, // required
        slug: values.slug, // required
        userId: userId, // server-only
        keepCurrentActiveOrganization: false,
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });
    revalidatePath("/dashboard");
    return {
      success: true,
      message: `Organization ${values.name} created successfully`,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message,
    };
  }
}

export type FullOrganizationType = Awaited<
  ReturnType<typeof auth.api.getFullOrganization>
>;

export async function getOrgBySlug(slug: string) {
  try {
    const data = await auth.api.getFullOrganization({
      query: {
        organizationSlug: slug,
      },
      headers: await headers(),
    });
    if (!data) {
      return { success: false, orgData: null, message: "No org found" };
    } else {
      return { success: true, orgData: data };
    }
  } catch {
    return {
      success: false,
      orgData: null,
      message: "Unable to get organization data",
    };
  }
}

export async function addOrgMember({
  userId,
  orgId,
}: {
  userId: string;
  orgId: string;
}) {
  try {
    const data = await auth.api.addMember({
      body: {
        userId: userId,
        role: ["member"], // required
        organizationId: orgId,
      },
    });
    if (data) {
      return { success: true, message: "Member added successfully" };
    } else {
      return { success: false, message: "Failed to add member" };
    }
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message };
  }
}

