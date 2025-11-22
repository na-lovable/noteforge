"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function listUsersAction() {
  try {
    const users = await auth.api.listUsers({
      query: {
        // searchValue: "Test",
        // searchField: "name",
        // searchOperator: "contains",
        // limit: 100,
        // offset: 100,
        // sortBy: "name",
        // sortDirection: "desc",
        // filterField: "email",
        // filterValue: "hello@example.com",
        // filterOperator: "eq",
      },
      headers: await headers(),
    });
    return {
      success: true,
      message: "Successfully fetched users list",
      usersList: users,
    };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occured";
    return { success: false, message: errorMessage };
  }
}

export async function createUserAction({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const newUser = await auth.api.createUser({
      body: {
        email: email, // required
        password: password, // required
        name: name, // required
        role: "user",
        data: { customField: "customValue" },
      },
      headers: await headers(),
    });
    return {
      success: true,
      message: `Created user "${newUser.user.name}" successfully with role ${newUser.user.role}`,
    };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occured";
    return { success: false, message: errorMessage };
  }
}
