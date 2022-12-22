import { useContext } from 'react';
import { ScheduleContext } from '../../../Pages/SchedulePage';
import DateTag from '../DateTag';
import styles from './ScheduleContainer.module.css'

function ScheduleContainer() {
    const varSchedulePage = useContext(ScheduleContext);

    return (
        <ul className={`${styles.scheduleContainer}`}>
            <div className="g_scroll g_scroll-x">
                {varSchedulePage.week.map((dateData, index) => {
                    return (
                        <div 
                            className={styles.scheduleItem}
                            key={index}
                        >
                            <DateTag
                                dayHeader={index}
                                dateData={dateData}
                            />
                        </div>
                    )
                })}
            </div>
        </ul>
    )
}

export default ScheduleContainer;