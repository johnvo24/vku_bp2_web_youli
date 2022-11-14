import styles from './Note.module.css'

function Note({noteData}) {
    return (
        <div className={styles.note + " g_item"} id={noteData.note_id}>
            <div className={styles.noteTitle}>
                { noteData.note_title }
            </div>
        </div>
    )
}

export default Note;