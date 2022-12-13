import { useContext, useState } from "react";
import noteBoxAPI from "../../../api/noteBoxAPI";
import { noteLang } from "../../../Constants/languages/NoteLanguages";
import { getCurrentUser, getLanguage, getObjectLocalStore, timeConverter } from "../../../Middlewares/Middlewares";
import { NotePageContext } from "../../../Pages/NotePage";
import BtnCancel from "../../Pieces/Buttons/BtnCancel";
import BtnSave from "../../Pieces/Buttons/BtnSave";

function DetailNoteBox() {
    const varNotePage = useContext(NotePageContext);
    let lang = getLanguage('YoleUser');
    let newNoteBox = {};
    
    if(varNotePage.editNoteBox) {
        newNoteBox = varNotePage.currentNoteBox;
    }

    const [title, setTitle] = useState(
        (varNotePage.editNoteBox)
        ? newNoteBox.note_box_title
        : (getObjectLocalStore('newNoteBox')
            ? getObjectLocalStore('newNoteBox').note_box_title 
            : "")
    );
    const [description, setDescription] = useState(
        (varNotePage.editNoteBox)
        ? newNoteBox.note_box_description
        : (getObjectLocalStore('newNoteBox') 
            ? getObjectLocalStore('newNoteBox').note_box_description 
            : "")
    );

    newNoteBox = {
        note_box_id: newNoteBox.note_box_id,
        user_id: getCurrentUser('YoleUser').user_id,
        note_box_title: title || "(no name)",
        note_box_description: description,
        created_at: timeConverter(new Date(), 'y-m-dTh:i:s:SZ'),
        updated_at: timeConverter(new Date(), 'y-m-dTh:i:s:SZ')
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
    }
    
    (!varNotePage.editNoteBox) && localStorage.setItem('newNoteBox', JSON.stringify(newNoteBox));

    const handleClickBtnSave = (e) => {
        e.preventDefault();
        if(varNotePage.editNoteBox) {
            noteBoxAPI().updateEdit(newNoteBox);
            varNotePage.setEditNoteBox(false);
        } else {
            noteBoxAPI().create(newNoteBox);
            localStorage.removeItem('newNoteBox');
        }
        varNotePage.setDetailNoteBox(false);
        varNotePage.reSetNoteBoxList();
    }
    const handleClickBtnCancel = (e) => {
        e.preventDefault();
        if(varNotePage.editNoteBox) {
            varNotePage.setEditNoteBox(false);
        } else {
            localStorage.removeItem('newNoteBox');
        }
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
                    <BtnCancel
                        handleClickBtnCancel={handleClickBtnCancel}
                    />
                </div>
            </div>
        </form>
    )
}

export default DetailNoteBox;