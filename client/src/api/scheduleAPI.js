import { SCHEDULE } from "./options";

/** Hàm trả về đối tượng scheduleAPI.
 * Chứa các phương thức API để tương tác với server
*/
const scheduleAPI = () => {
    const scheduleAPI = {};
    
    scheduleAPI.index = async (date) => {
        const userData = JSON.parse(localStorage.getItem('YoleUser'));
        return await SCHEDULE.get(`/index/${userData.user_id}/${date}`);
    }
    scheduleAPI.getTask = async (data) => {
        const type = data.task_id ? "1" : "2";
        return await SCHEDULE.get(`/get_task/${data.schedule_id}/${type}`);
    }

    return scheduleAPI;
}

export default scheduleAPI;