"use server";

import { db } from "@/db/drizzle";
import { InsertNote, note } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function createNote(values: InsertNote) {
    try {
        await db.insert(note).values(values);
        return { success: true, message: "Note created successfully" };
    } catch (error) {
        return { success: false, message: "Failed to create note" }
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

        const notebooksByUser = await db
            .select()
            .from(notebook)
            .where(eq(notebook.userId, userId));

        return { success: true, notebooks: notebooksByUser };
    } catch (error) {
        return { success: false, message: "Failed to get notebooks" };
    };
};

export async function getNotebookById(id: string) {
    try {
        const notebookById = await db
            .select()
            .from(notebook)
            .where(eq(notebook.id, id));
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

export async function deleteNotebook(id: string, values: InsertNotebook) {
    try {
        db.delete(notebook).where(eq(notebook.id, id));
        return { success: true, message: "Notebook deleted successfully" };
    } catch (error) {
        return { success: false, message: "Failed to delete notebook" };
    }
}