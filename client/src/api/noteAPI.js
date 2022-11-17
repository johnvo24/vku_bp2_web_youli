import { NOTE } from './options.js'

/** Hàm trả về đối tượng noteAPI.
 * Chứa các phương thức API để tương tác với server
*/
const noteAPI = () => {
    const noteAPI = {};

    noteAPI.getNote = (note_box_id) => {
        return NOTE.get(`/index/${ note_box_id }`);
    } 

    return noteAPI;
}

export default noteAPI;