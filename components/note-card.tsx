"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Note } from "@/db/schema";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2, Trash2 } from "lucide-react";
import { deleteNote } from "@/server/notes";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NoteCard({ note }: { note: Note }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  async function handleDeleteNote() {
    setIsDeleting(true);
    try {
      const response = await deleteNote(note.id);
      if (response.success) {
        toast.success(response.message);
        router.refresh();
      } else toast.error(response.message);
    } catch (error) {
      const e = error as Error;
      console.log(e.message);
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <Card className="grid grid-cols-1">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>
          Description for the note titled: "{note.title}"
        </CardDescription>
        <CardAction>
          <Button>
            <Link href={`/dashboard/notebook/${note.notebookId}/note/${note.id}`}>View</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{note.content}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          disabled={isDeleting}
          onClick={handleDeleteNote}
          className="self-end"
        >
          {isDeleting ? <Loader2 className="animate-spin"/> : <Trash2 />}
        </Button>
      </CardFooter>
    </Card>
  );
}
