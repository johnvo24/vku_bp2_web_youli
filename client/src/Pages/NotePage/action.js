import noteAPI from "../../api/noteAPI";
import noteBoxAPI from "../../api/noteBoxAPI";

export const action = {
    reSetNoteBoxList: (setNodeBoxList) => {
        noteBoxAPI().getView()
            .then((res) => {
                setNodeBoxList(res.data)
            }).catch((err) => { console.log(err) });
    },
    deleteFinishedNoteBox: () => noteBoxAPI().clean(),
    deleteNoteBox: (note_box_id) => noteBoxAPI().delete(note_box_id),
    deleteNote: (note_id) => noteAPI().delete(note_id),
}