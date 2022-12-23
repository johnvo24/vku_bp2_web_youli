import { useContext, useEffect, useState } from 'react';
import scheduleAPI from '../../../api/scheduleAPI';
import { scheduleLang } from '../../../Constants/languages/ScheduleLanguage';
import { getLanguage, timeToPxConvrter } from '../../../Middlewares/Middlewares';
import { ScheduleContext } from '../../../Pages/SchedulePage';
import styles from './TaskTag.module.css'

function TaskTag({ taskData }) {
    const varSchedulePage = useContext(ScheduleContext);
    const [taskData1, setTaskData1] = useState({});

    useEffect(() => {
        scheduleAPI().getTask(taskData || {})
            .then((res) => {
                setTaskData1(res.data)
            })
    }, [taskData]);

    const handleClickTaskTag = (e) => {
        e.target.parentElement.parentElement.parentElement.scrollTo(0, timeToPxConvrter(taskData1.task_from));
    }
    const handleDoubleClickTaskName = () => {
        localStorage.setItem('newTask', JSON.stringify(taskData1));
        varSchedulePage.setEditTask(!varSchedulePage.editTask);
    }

    //NOTE_---------------------------------------------------
    let handleOnMouseOut = () => { };
    const handleOnMouseOver = (e) => {
        if (e.target.id === `taskTag${taskData1.schedule_id}`) {
            e.target.style.minHeight = (timeToPxConvrter(taskData1.task_to) - timeToPxConvrter(taskData1.task_from)) + "px";
            handleOnMouseOut = (e) => {
                e.target.style.minHeight = "unset";
                e.target.style.height = (timeToPxConvrter(taskData1.task_to) - timeToPxConvrter(taskData1.task_from)) + "px";
            }
        }
    }

    return (
        <div
            id={`taskTag${taskData1.schedule_id}`}
            className={styles.taskTag +" g_scroll g_scroll-y g_scroll-hidden"}
            style={{
                height: timeToPxConvrter(taskData1.task_to) - timeToPxConvrter(taskData1.task_from) + "px",
                backgroundColor: taskData1.task_color,
                color: taskData1.task_text_color,
            }}
            onClick={handleClickTaskTag}
            onMouseOver={handleOnMouseOver}
            onMouseOut={handleOnMouseOut}
        >
            <div
                className={styles.taskName}
                onDoubleClick={handleDoubleClickTaskName}
            >
                {taskData1.task_name}
            </div>
            <div className={styles.taskContent}>
                {(taskData1.task_note) && (<div className={styles.taskNote}>
                    {scheduleLang.taskNote[getLanguage('YoleUser')]}:
                    <p>{taskData1.task_note}</p>
                </div>)}
                {(taskData1.task_link) && (<div className={styles.taskLink}>
                    {scheduleLang.taskTo[getLanguage('YoleUser')]}:
                    <a target="_blank" href={taskData1.task_link}>{taskData1.task_link}</a>
                </div>)}
            </div>
            <div className={styles.taskBottom}>
                {taskData1.task_from + " - " + taskData1.task_to}
            </div>

        </div>
    )
}

export default TaskTag;