import { getNotebooksByUser } from "@/server/notebooks"

export default async function Notebooks({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const response  = await getNotebooksByUser();
    return(
        <div>
            {response.success &&
            response.notebooks?.map((item) => (
                <div key={item.id} className="text-green-400 m-2">{item.name}</div>
            ))}
            {response.success &&
            response.notebooks?.length === 0 && (
                <div>No notebooks found</div>
            )}
        </div>
    )
}