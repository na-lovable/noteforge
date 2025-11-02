import { CreateNote } from "@/components/create-note";
import Notes from "@/components/notes";
import PageWrapper from "@/components/page-wrapper";
import { getNotebookById } from "@/server/notebooks";

export default async function Notebook({
  params,
}: {
  params: Promise<{ notebookId: string }>;
}) {
  const id = (await params).notebookId;
  const { notebook } = await getNotebookById(id);
  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        {
          label: notebook?.name ?? "Notebook",
          path: `/dashboard/notebook/${id}`,
        },
      ]}
    >
      {notebook ? (
        <div className="m-2">
          <h1>{notebook?.name}</h1>
          <CreateNote notebook={notebook} />
          {notebook?.notes ? (
            <Notes notebook={notebook} />
          ) : (
            <div>No notes yet</div>
          )}
        </div>
      ) : (
        <div>No such notebook exists</div>
      )}
    </PageWrapper>
  );
}
