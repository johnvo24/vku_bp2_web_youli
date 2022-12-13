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
    noteBoxAPI.getNoteBox = async (note_box_id) => {
        return await NOTEBOX.get(`/get_note_box/${note_box_id}`)
    }
    noteBoxAPI.create = (data) => {
        return NOTEBOX.post('/create', data);
    }
    noteBoxAPI.update = async (data) => {
        return await NOTEBOX.post(`/update`, data);
    }
    noteBoxAPI.updateEdit = async (data) => {
        return await NOTEBOX.post(`/update_edit`, data);
    }
    noteBoxAPI.updateLatest = async (data) => {
        return await NOTEBOX.post('/update_latest', data);
    }
    noteBoxAPI.delete = async (note_box_id) => {
        return await NOTEBOX.delete('/delete/'+ note_box_id);
    }
    noteBoxAPI.clean = async () => {
        return await NOTEBOX.delete(`/clean`);
    }

    return noteBoxAPI;
}

export default noteBoxAPI;