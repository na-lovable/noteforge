import { getNotebooksByUser } from "@/server/notebooks"
import NotebookCard from "@/components/notebook-card";

export default async function Notebooks({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const response  = await getNotebooksByUser();
    return(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 m-4">
            {response.success &&
            response.notebooks?.map((notebookItem) => (
                <NotebookCard notebook={notebookItem} key={notebookItem.id}/>
            ))}
            {response.success &&
            response.notebooks?.length === 0 && (
                <div>No notebooks found</div>
            )}
            {!response.success &&
            <div>{response.message}</div>
            }
        </div>
    )
}