import noteBoxAPI from "../../api/noteBoxAPI";

export const action = {
    reSetNoteBoxList: (setNodeBoxList) => {
        noteBoxAPI().getView()
            .then((res) => {
                setNodeBoxList(res.data)
            }).catch((err) => { console.log(err) });
    }
}