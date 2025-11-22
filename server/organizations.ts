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

export async function createOrgTeam(teamName: string) {
  try {
    const data = await auth.api.createTeam({
      body: {
        name: teamName, // required
        // organizationId: "organization-id",
      },
      headers: await headers(),
    });
    return { success: true, message: "Created team" };
  } catch (error) {
    console.log(error);
    const e = error as Error;
    return { success: false, message: e.message };
  }
}

export async function getOrgTeams(orgId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return { success: false, message: "Valid session not found" };
    }
    const data = await auth.api.listOrganizationTeams({
      query: {
        organizationId: orgId,
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });

    if (!data) {
      return { success: false, message: "Failed to get teams" };
    }

    return { success: true, message: "Teams list fetched", teams: data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error" };
  }
}

export async function removeOrgTeam(teamId: string) {
  try {
    // const session = await auth.api.getSession({
    //   headers: await headers(),
    // });
    // if (!session) {
    //   return { success: false, message: "Valid session not found" };
    // }
    // const activeOrg = session.session.activeOrganizationId;
    // if (!activeOrg) {
    //   return { success: false, message: "No active org found" };
    // }

    const data = await auth.api.removeTeam({
      body: {
        teamId: teamId, // required
        // organizationId: "organization-id",
      },
      headers: await headers(),
    });

    if (!data) {
      return { success: false, message: "Failed to remove team" };
    }
    return { success: true, message: data.message };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error" };
  }
}

export async function updateTeamAction({
  teamId,
  teamNewName,
}: {
  teamId: string;
  teamNewName: string;
}) {
  try {
    const data = await auth.api.updateTeam({
      body: {
        teamId: teamId, // required
        data: {
          // required
          name: teamNewName,
        },
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });
    return {
      success: true,
      message: `Team name updated to "${teamNewName}" successfully`,
    };
  } catch (error) {
    console.error("API Error: ", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occurred during team update.";
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function addTeamMemberAction({
  teamId,
  userId,
}: {
  teamId: string;
  userId: string;
}) {
  try {
    const data = await auth.api.addTeamMember({
      body: {
        teamId: teamId, // required
        userId: userId, // required
      },
      headers: await headers(),
    });
    return { success: true, message: "Successfully added user to the team " };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occured while adding the user to the team";
    return { success: false, message: errorMessage };
  }
}

export async function listTeamMembersAction(teamId: string) {
  try {
    const data = await auth.api.listTeamMembers({
      query: {
        teamId: teamId,
      },
      headers: await headers(),
    });
    
    return { success: true, teamMembers: data };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occured while fetching the list of users of the team";
    return { success: false, message: errorMessage };
  }
}

export async function removeTeamMemberAction({
  teamId,
  userId,
}: {
  teamId: string;
  userId: string;
}) {
  try {
    const data = await auth.api.removeTeamMember({
      body: {
        teamId: teamId, // required
        userId: userId, // required
      },
      headers: await headers(),
    });
    return { success: true, message: "Successfully removed user from the team " };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occured while removing the user from the team";
    return { success: false, message: errorMessage };
  }
}