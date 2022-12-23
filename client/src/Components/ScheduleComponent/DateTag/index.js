import { useEffect, useState } from 'react';
import scheduleAPI from '../../../api/scheduleAPI';
import { day } from '../../../Constants/GlobalVariables';
import { getLanguage, timeConverter, timeToPxConvrter } from '../../../Middlewares/Middlewares';
import TaskTag from '../TaskTag';
import styles from './DateTag.module.css';

function DateTag({ dayHeader, dateData }) {
    const timeLine = [];
    let tempPos = 0;
    for (let i = 0; i < 49; i++) {
        timeLine[i] = tempPos;
        tempPos += 18;
    }
    const [taskList, setTaskList] = useState([]);
    const [presentTime, setPresenntTime] = useState(dateData.date || null);

    useEffect(() => {
        scheduleAPI().index(timeConverter(dateData.date, "y-m-d"))
            .then((res) => {
                setTaskList(res.data)
            })
            .catch((err) => console.log(err))
    }, [dateData]);

    useEffect(() => {
        const myInterval = setInterval(() => {
            setPresenntTime(new Date());
        }, 100);
        return () => {
            clearInterval(myInterval);
        }
    }, [])

    return (
        <div
            className={styles.dateTag + " g_tag"}
        >
            <div className={`g_header`}>
                <div className={styles.tagName}>
                    <span className='g_title'>{day[dayHeader][getLanguage('YoleUser')]}</span>
                </div>
            </div>

            <div className={`${styles.tagBody} g_body`}>
                <div className={styles.tagContainer + " g_scroll g_scroll-y g_scroll-mini"}>
                    <div className={styles.tagMain}>
                        {timeLine.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`${styles.line} ${((item / 18 === 49) || (item / 18 % 2 === 0)) ? styles.line1 : styles.line2}`}
                                    style={{ top: item + "px" }}
                                />
                            )
                        })}

                        {
                            taskList.map((taskData, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={styles.taskContainer}
                                        style={{
                                            top: timeToPxConvrter(taskData.task_from)
                                        }}
                                    >
                                        <TaskTag
                                            taskData={taskData}
                                        />
                                    </div>
                                )
                            })
                        }
                        {timeLine.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`${styles.line0} ${((item / 18 === 49) || (item / 18 % 2 === 0)) ? styles.line1 : styles.line2}`}
                                    style={{ top: item + "px" }}
                                />
                            )
                        })}
                        {timeLine.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`${styles.time} ${((item / 18 === 49) || (item / 18 % 2 === 0)) ? styles.time1 : styles.time2}`}
                                    style={{ top: item + "px" }}
                                >
                                    {`${(Math.floor(item / 36) < 10) ? "0" + Math.floor(item / 36) : Math.floor(item / 36)
                                        }:${((item * 60 / 36 % 60) < 10) ? "0" + item * 60 / 36 % 60 : item * 60 / 36 % 60}`}
                                </div>
                            )
                        })}
                        {
                            (presentTime.toDateString() === dateData.date.toDateString())
                            &&
                            (<div className={styles.presentTime}
                                style={{
                                    top: timeToPxConvrter(timeConverter(presentTime, 'h:i:s')) + "px",
                                }}
                            >
                                <i className="fa-solid fa-caret-right"></i>
                                <i className="fa-solid fa-caret-left"></i>
                            </div>)
                        }
                    </div>
                </div>
            </div>

            <div className='g_footer g_justify-content-end'>
                <div>
                    {timeConverter(dateData.date, "d/m/y")}
                </div>
            </div>
        </div >
    )
}

export default DateTag;