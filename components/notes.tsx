import NoteCard from "@/components/note-card";
import { Notebook } from "@/db/schema";

export default async function Notes({notebook} : {notebook: Notebook}) {
    return(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 m-4">
            {notebook?.notes.map((noteItem) => (
                <NoteCard note={noteItem} key={noteItem.id}/>
            ))}
            {notebook?.notes.length === 0 && (
                <div>No notes found</div>
            )}
        </div>
    )
}