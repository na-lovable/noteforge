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

export async function getNoteById(id: string) {
    try {
        const noteById = await db
            .select()
            .from(note)
            .where(eq(note.id, id));
        return { success: true, note: noteById };
    } catch (error) {
        return { success: false, message: "Failed to get note" };
    }
}

export async function updateNote(id: string, values: InsertNote) {
    try {
        db.update(note).set(values).where(eq(note.id, id));
        return { success: true, message: "Note updated successfully" };
    } catch (error) {
        return { success: false, message: "Failed to update note" };
    }
}

export async function deleteNote(id: string, values: InsertNote) {
    try {
        db.delete(note).where(eq(note.id, id));
        return { success: true, message: "Note deleted successfully" };
    } catch (error) {
        return { success: false, message: "Failed to delete note" };
    }
}