import { NOTE } from './options.js'

/** Hàm trả về đối tượng noteAPI.
 * Chứa các phương thức API để tương tác với server
*/
const noteAPI = () => {
    const noteAPI = {};

    noteAPI.getNote = (note_box_id) => {
        return NOTE.get(`/index/${ note_box_id }`);
    }
    noteAPI.create = (data) => {
        return NOTE.post('/create', data);
    }
    noteAPI.update = (data) => {
        return NOTE.post('/update', data);
    }
    noteAPI.updatePriority = (data) => {
        return NOTE.post('/update-priority', data);
    }

    return noteAPI;
}

export default noteAPI;