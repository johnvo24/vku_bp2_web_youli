import { useEffect, useState } from 'react';
import scheduleAPI from '../../../api/scheduleAPI';
import { timeToPxConvrter } from '../../../Middlewares/Middlewares';
import styles from './TaskTag.module.css'

function TaskTag({ taskData }) {
    const [taskData1, setTaskData1] = useState({});
    useEffect(() => {
        scheduleAPI().getTask(taskData || {})
            .then((res) => {
                setTaskData1(res.data)
            })
    }, [taskData]);

    return (
        <div
            className={styles.taskTag}
            style={{
                height: timeToPxConvrter(taskData1.task_to) - timeToPxConvrter(taskData1.task_from) + "px",
                backgroundColor: taskData1.task_color,
                color: taskData1.task_text_color,
            }}
        >
            <div className={styles.taskName}>
                {taskData1.task_name}
            </div>

            <div className={styles.taskTop}>
                {taskData1.task_from + " - " + taskData1.task_to}
            </div>
            <div className={styles.taskBottom}>
                {taskData1.task_from + " - " + taskData1.task_to}
            </div>

        </div>
    )
}

export default TaskTag;