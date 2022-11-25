import NoteBox from '../NoteBox';
import styles from './NoteContainer.module.css'

function NoteContainer({ noteBoxList, handleReRenderNoteBoxList}) {

    return (
        <ul className={styles.noteContainer}>
            {noteBoxList.map((noteBox) => (
                <NoteBox
                    key={noteBox.note_box_id}
                    noteBoxData={noteBox}
                    handleReRenderNoteBoxList={handleReRenderNoteBoxList}
                />
            ))}
        </ul>
    )
}

export default NoteContainer;