import { useContext } from "react";
import { useState } from "react";
import scheduleAPI from "../../../api/scheduleAPI";
import { scheduleLang } from "../../../Constants/languages/ScheduleLanguage";
import { getCurrentUser, getLanguage, getObjectLocalStore, toFullTime } from "../../../Middlewares/Middlewares";
import { ScheduleContext } from "../../../Pages/SchedulePage";
import BtnDeleteChild from "../../Pieces/Buttons/BtnDeleteChild";
import BtnCancel from "../../Pieces/Buttons/BtnCancel";
import BtnSave from "../../Pieces/Buttons/BtnSave";
import ColorBox from "../ColorBox";


function DetailTask() {
    let lang = getLanguage('YoleUser');

    const varSchedulePage = useContext(ScheduleContext);
    const [taskName, setTaskName] = useState(
        getObjectLocalStore('newTask')?.task_name || ""
    );
    const [taskFrom, setTaskFrom] = useState(
        getObjectLocalStore('newTask')?.task_from || ""
    );
    const [taskTo, setTaskTo] = useState(
        getObjectLocalStore('newTask')?.task_to || ""
    );
    const [loop, setLoop] = useState(
        getObjectLocalStore('newTask')?.task_loop || "only_one"
    );
    const [taskDate, setTaskDate] = useState(
        getObjectLocalStore('newTask')?.task_date || ""
    );
    const [taskNote, setTaskNote] = useState(
        getObjectLocalStore('newTask')?.task_note || ""
    );
    const [taskLink, setTaskLink] = useState(
        getObjectLocalStore('newTask')?.task_link || ""
    );
    const [taskColor, setTaskColor] = useState(
        getObjectLocalStore('newTask')?.task_color || "#FFFFFF"
    );
    const [taskTextColor, setTaskTextColor] = useState(
        getObjectLocalStore('newTask')?.task_text_color || "#000000"
    );

    let newTask = {
        schedule_id: (getObjectLocalStore('newTask')?.schedule_id) || null,
        user_id: getCurrentUser('YoleUser').user_id,
        task_name: taskName,
        task_from: taskFrom,
        task_to: taskTo,
        task_loop: loop,
        task_date: taskDate,
        task_note: taskNote,
        task_link: taskLink,
        task_color: taskColor,
        task_text_color: taskTextColor
    }

    localStorage.setItem('newTask', JSON.stringify(newTask));

    const handleClickColorSquare = (item) => {
        setTaskColor(item.task_color);
        setTaskTextColor(item.task_text_color);
    }
    const handleClickBtnSave = (e) => {
        e.preventDefault();
        if (varSchedulePage.editTask) {
            scheduleAPI().update(newTask);
        } else {
            scheduleAPI().create(newTask);
        }

        localStorage.removeItem('newTask');
        varSchedulePage.reSetWeek();
        varSchedulePage.setDetailTask(false);
        varSchedulePage.setEditTask(false);
    }

    const handleClickBtnCancel = (e) => {
        e.preventDefault();

        localStorage.removeItem('newTask');
        varSchedulePage.setDetailTask(false);
        varSchedulePage.setEditTask(false);
    }
    const handleClickBtnDeleteChild = (e) => {
        e.preventDefault();
        scheduleAPI().delete(newTask);
        
        varSchedulePage.reSetWeek();
        localStorage.removeItem('newTask');
        varSchedulePage.setDetailTask(false);
        varSchedulePage.setEditTask(false);
    }
 
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="g_loosen_up_child g_m_b1">
                <div className="g_header g_upcase g_center g_p_relative">
                    {scheduleLang.task[lang]}
                    { (varSchedulePage.editTask) && (<div className="g_p_absolute g_right_2">
                        <BtnDeleteChild
                            handleClickBtnDeleteChild={handleClickBtnDeleteChild}
                        />
                    </div>) }
                </div>
                <div>
                    <div className="g_label">
                        {scheduleLang.taskName[lang]}:
                    </div>
                    <input
                        type="text"
                        className="g_input"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>
                <div className="g_d_flex">
                    <div className="g_w_50">
                        <div className="g_label">
                            {scheduleLang.taskFrom[lang]}:
                        </div>
                        <div className="g_d_flex">
                            <input
                                type="text"
                                className="g_input"
                                name="task_from"
                                value={taskFrom}
                                disabled="disabled"
                                style={{
                                    userSelect: "none"
                                }}
                            />
                            <input
                                type="time"
                                className="g_time"
                                onChange={(e) => setTaskFrom(toFullTime(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="g_w_50 g_m_0">
                        <div className="g_label">
                            {scheduleLang.taskTo[lang]}:
                        </div>
                        <div className="g_d_flex">
                            <input
                                type="text"
                                className="g_input"
                                name="task_to"
                                value={taskTo}
                                disabled="disabled"
                                style={{
                                    userSelect: "none"
                                }}
                            />
                            <input
                                type="time"
                                className="g_time"
                                onChange={(e) => setTaskTo(toFullTime(e.target.value))}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="g_d_flex">
                        <div className="g_w_50">
                            <div className="g_label">
                                {scheduleLang.taskLoop[lang]}:
                            </div>
                            <select
                                className="g_select"
                                value={loop}
                                onChange={(e) => setLoop(e.target.value)}
                            >
                                <option value="only_one">
                                    {scheduleLang.onlyOne[lang]}
                                </option>
                                <option value="infinity">
                                    {scheduleLang.infinity[lang]}
                                </option>
                            </select>
                        </div>
                        {
                            (loop === 'only_one') && (
                                <div className="g_w_50 g_m_0">
                                    <div className="g_label">
                                        {scheduleLang.taskDate[lang]}:
                                    </div>
                                    <input
                                        type="date"
                                        className="g_input"
                                        value={taskDate}
                                        style={{
                                            userSelect: "none"
                                        }}
                                        onChange={(e) => setTaskDate(e.target.value)}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div>
                    <div className="g_label">
                        {scheduleLang.taskNote[lang]}:
                    </div>
                    <textarea
                        className="g_textarea g_scroll"
                        value={taskNote}
                        onChange={(e) => setTaskNote(e.target.value)}
                    />
                </div>
                <div>
                    <div className="g_label">
                        {scheduleLang.taskLink[lang]}:
                    </div>
                    <input
                        type="text"
                        className="g_input"
                        value={taskLink}
                        onChange={(e) => setTaskLink(e.target.value)}
                    />
                </div>
                <div>
                    <div className="g_label">
                        {scheduleLang.taskColor[lang]}:
                    </div>
                    <div className="g_d_flex">
                        <div className="g_w_25 g_d_flex g_flex_column">
                            <div
                                className="g_input g_h_50"
                                style={{
                                    backgroundColor: taskColor,
                                    fontWeight: "bolder"
                                }}
                            >
                                {taskColor}
                            </div>
                            <div
                                className="g_input g_h_50"
                                style={{
                                    backgroundColor: taskTextColor,
                                    fontWeight: "bolder"
                                }}
                            >
                                {taskTextColor}
                            </div>
                        </div>
                        <div className="g_color_table g_flex_1">
                            <ColorBox
                                handleClickColorSquare={handleClickColorSquare}
                            />
                        </div>
                    </div>
                </div>
                <div className="g_j-c_space-between g_d_flex g_m_t3">
                    <BtnSave
                        handleClickBtnSave={handleClickBtnSave}
                    />
                    <BtnCancel
                        handleClickBtnCancel={handleClickBtnCancel}
                    />
                </div>
            </div>
        </form>
    )
}

export default DetailTask;