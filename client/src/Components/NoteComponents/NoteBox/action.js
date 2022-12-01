import noteBoxAPI from "../../../api/noteBoxAPI";

export const action = {

    checkOverPreEle: (pointer, PreEle) => {
        const preFigure = PreEle.getBoundingClientRect();
        if ((pointer.y - window.scrollY)< (preFigure.top + preFigure.height)) {
            return true;
        }
        return false;
    },

    checkOverPosEle: (pointer, PosEle) => {
        const posFigure = PosEle.getBoundingClientRect();
        if ((pointer.y - window.scrollY) > posFigure.top) {
            return true;
        }
        return false;
    },

    swap: (nodeA, nodeB) => {
        const parentA = nodeA.parentNode;
        const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

        // Move `nodeA` to before the `nodeB`
        nodeB.parentNode.insertBefore(nodeA, nodeB);

        // Move `nodeB` to before the sibling of `nodeA`
        parentA.insertBefore(nodeB, siblingA);
    },
    reSetNoteBoxData: (setNoteBoxData, note_box_id) => {
        noteBoxAPI().getNoteBox(note_box_id)
            .then((res) => {
                setNoteBoxData(res.data)
            }).catch((err) => console.log(err))
    }
};