import styles from './NoteBoxList.module.css'

const noteBoxList = [
    {
        x: 1,
        y: 2
    },
    {
        x: 3,
        y: 4
    },
    {
        x: 3,
        y: 2
    },
    {
        x: 1,
        y: 4
    },
]

function NoteBoxList() {
    return (
        <ul className={styles.noteBoxList}>
            {noteBoxList.map((noteBox) => {
                
            })}
        </ul>
    )
}

export default NoteBoxList;