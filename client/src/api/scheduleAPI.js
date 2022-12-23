import { getCurrentUser } from "../Middlewares/Middlewares";
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
        return await SCHEDULE.get(`/get_task/${data.schedule_id}`);
    }
    scheduleAPI.create = async (data) => {
        return await SCHEDULE.post(`/create_task`, data);
    }
    scheduleAPI.update = async (data) => {
        return await SCHEDULE.post(`/update_task`, data);
    }
    scheduleAPI.delete = async (data) => {
        return await SCHEDULE.post(`/delete_task`, data);
    }
    
    return scheduleAPI;
}

export default scheduleAPI;