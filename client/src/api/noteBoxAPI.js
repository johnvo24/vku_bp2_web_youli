import { NOTEBOX } from "./options";

/** Hàm trả về đối tượng noteBoxAPI.
 * Chứa các phương thức API để tương tác với server
*/
const noteBoxAPI = () => {
    const noteBoxAPI = {};
    
    noteBoxAPI.getView = async () => {
        return await NOTEBOX.get(`/index/${
            JSON.parse(localStorage.getItem('YoleUser')).user_id
        }`);
    }
    noteBoxAPI.create = (data) => {
        return NOTEBOX.post('/create', data);
    }
    noteBoxAPI.update = async (data) => {
        return await NOTEBOX.post(`/update`, data);
    }

    return noteBoxAPI;
}

export default noteBoxAPI;