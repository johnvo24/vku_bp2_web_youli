import NoteBox from '../NoteBox';
import styles from './NoteContainer.module.css'

function NoteContainer({ noteBoxList }) {

    return (
        <ul className={`${styles.noteContainer} g_scroll`}>
            {noteBoxList.map((noteBox) => (
                <NoteBox
                    key={noteBox.note_box_id}
                    noteBoxData={noteBox}
                />
            ))}
        </ul>
    )
}

export default NoteContainer;