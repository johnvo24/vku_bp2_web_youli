import { useContext, useEffect, useState } from "react";
import noteBoxAPI from "../../../api/noteBoxAPI";
import { noteLang } from "../../../Constants/languages/NoteLanguages";
import { getCurrentUser, getLanguage, getObjectLocalStore } from "../../../Middlewares/Middlewares";
import { NotePageContext } from "../../../Pages/NotePage";
import BtnDelete from "../../Pieces/Buttons/BtnDelete";
import BtnSave from "../../Pieces/Buttons/BtnSave";

function DetailNoteBox() {
    const varNotePage = useContext(NotePageContext);

    let lang = getLanguage('YoleUser');
    
    const [title, setTitle] = useState(getObjectLocalStore('newNoteBox') ? getObjectLocalStore('newNoteBox').note_box_title : "");
    const [description, setDescription] = useState(getObjectLocalStore('newNoteBox') ? getObjectLocalStore('newNoteBox').note_box_description : "");

    const handleSubmitForm = (e) => {
        e.preventDefault();
    }
    const newNoteBox = {
        user_id: getCurrentUser('YoleUser').user_id,
        note_box_title: title  || "(no name)",
        note_box_description:  description
    }
    useEffect(() => {
        // localStorage.getItem('newNoteBox') && localStorage.removeItem('newNoteBox');
        localStorage.setItem('newNoteBox', JSON.stringify(newNoteBox));
    }, [newNoteBox]);

    const handleClickBtnSave = (e) => {
        e.preventDefault();
        noteBoxAPI().create(newNoteBox);
        localStorage.removeItem('newNoteBox');
        varNotePage.setDetailNoteBox(false);
        varNotePage.reSetNoteBoxList();
    }
    const handleClickBtnDelete = (e) => {
        e.preventDefault();
        localStorage.removeItem('newNoteBox');
        varNotePage.setDetailNoteBox(false);
    }

    return (
        <form onSubmit={handleSubmitForm}>
            <div className="g_loosen_up_child g_m_b1">
                <div className="g_header g_upcase g_center">
                    {noteLang.notebox[lang]}
                </div>
                <div>
                    <div className="g_label">
                        {noteLang.title[lang]}
                    </div>
                    <input
                        type="text"
                        className="g_input"
                        name="note_box_title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <div className="g_label">
                        {noteLang.description[lang]}
                    </div>
                    <textarea
                        type="text"
                        className="g_textarea"
                        name="note_box_description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <input className="g_d_none" type="submit" />
                <div className="g_j-c_space-between g_d_flex g_m_t3">
                    <BtnSave
                        handleClickBtnSave={handleClickBtnSave}
                    />
                    <BtnDelete 
                        handleClickBtnDelete={handleClickBtnDelete}
                    />
                </div>
            </div>
        </form>
    )
}

export default DetailNoteBox;