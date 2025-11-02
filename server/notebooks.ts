"use server";

import { db } from "@/db/drizzle";
import { InsertNotebook, notebook } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createNotebook(values: InsertNotebook) {
    try {
        await db.insert(notebook).values(values);
        // await revalidatePath("/dashboard");
        return { success: true, message: "Notebook created successfully" };
    } catch (error) {
        return { success: false, message: "Failed to create notebook" }
    };
};

export async function getNotebooksByUser() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        const userId = session?.user?.id;

        if (!userId) {
            console.log("No one logged in")
            return { success: false, message: "User not found" }
        }

        const notebooksByUser = await db.query.notebook.findMany({
            where: eq(notebook.userId, userId),
            with: {
                notes: true
            }
        });

        return { success: true, notebooks: notebooksByUser };
    } catch (error) {
        return { success: false, message: "Failed to get notebooks" };
    };
};

export async function getNotebookById(id: string) {
    try {
        const notebookById = await db.query.notebook.findFirst({
            where: eq(notebook.id, id),
            with: {
                notes: true,
            }
        });
        return { success: true, notebook: notebookById };
    } catch (error) {
        return { success: false, message: "Failed to get notebook" };
    }
}

export async function updateNotebook(id: string, values: InsertNotebook) {
    try {
        db.update(notebook).set(values).where(eq(notebook.id, id));
        return { success: true, message: "Notebook updated successfully" };
    } catch (error) {
        return { success: false, message: "Failed to update notebook" };
    }
}

export async function deleteNotebook(id: string) {
    try {
        db.delete(notebook).where(eq(notebook.id, id)).execute();
        return { success: true, message: "Notebook deleted successfully" };
    } catch (error) {
        return { success: false, message: "Failed to delete notebook" };
    }
}