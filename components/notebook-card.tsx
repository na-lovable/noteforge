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
import { Notebook } from "@/db/schema";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2, Trash2 } from "lucide-react";
import { deleteNotebook } from "@/server/notebooks";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NotebookCard({ notebook }: { notebook: Notebook }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  async function handleDeleteNotebook() {
    setIsDeleting(true);
    try {
      const response = await deleteNotebook(notebook.id);
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
        <CardTitle>{notebook.name}</CardTitle>
        <CardDescription>
          Description for the notebook {notebook.name}
        </CardDescription>
        <CardAction>
          <Button>
            <Link href={`/dashboard/notebook/${notebook.id}`}>View</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          disabled={isDeleting}
          onClick={handleDeleteNotebook}
          className="self-end"
        >
          {isDeleting ? <Loader2 className="animate-spin"/> : <Trash2 />}
        </Button>
      </CardFooter>
    </Card>
  );
}
