import PageWrapper from "@/components/page-wrapper";
import { getNoteById } from "@/server/notes";

export default async function Note({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const id = (await params).noteId;
  const { note } = await getNoteById(id);
  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        {
          label: note?.notebook.name ?? "Notebook",
          path: `/dashboard/notebook/${note?.notebookId}`,
        },
        {
          label: note?.title ?? "Note",
          path: `/dashboard/notebook/${note?.notebookId}/note/${id}`,
        },
      ]}
    >
      <div className="grid grid-cols-1 items-stretch m-4 h-60">
        <h1 className="font-bold text-2xl">{note?.title}</h1>
        <p className="font-medium italic">{note?.content}</p>
      </div>
    </PageWrapper>
  );
}
