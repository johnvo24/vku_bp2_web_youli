import { useContext, useState } from "react";
import noteAPI from "../../../api/noteAPI";
import noteBoxAPI from "../../../api/noteBoxAPI";
import { listOfNavBar } from "../../../Constants/GlobalVariables";
import { noteLang } from "../../../Constants/languages/NoteLanguages";
import { getLanguage, timeConverter } from "../../../Middlewares/Middlewares";
import { NotePageContext } from "../../../Pages/NotePage";
import BtnCancel from "../../Pieces/Buttons/BtnCancel";
import BtnChooseFile from "../../Pieces/Buttons/BtnChooseFile";
import BtnSave from "../../Pieces/Buttons/BtnSave";


function DetailNote() {
    const varNotePage = useContext(NotePageContext);
    let lang = getLanguage('YoleUser')
    const [fileChanged, setFileChaged] = useState(false);

    const [title, setTitle] = useState(
        varNotePage.editNote
            ? varNotePage.currentNote.note_title
            : ""
    );
    const [file, setFile] = useState({});
    const [imgPath, setImgPath] = useState(
        varNotePage.editNote
            ? (varNotePage.currentNote.note_img)
            : ""
    );
    const [description, setDescription] = useState(
        varNotePage.editNote
            ? varNotePage.currentNote.note_description
            : ""
    );
    const [link, setLink] = useState(
        varNotePage.editNote
            ? varNotePage.currentNote.note_link
            : ""
    );
    const newNote = {};

    const handleClickBtnChooseFile = (e) => {
        e.preventDefault();
        document.getElementById("img_to_upload").click();
    }

    const handleClickBtnSave = async (e) => {
        e.preventDefault();
        newNote.note_box_id = varNotePage.editNote
            ? varNotePage.currentNote.note_box_id
            : varNotePage.currentNoteBox.note_box_id
        newNote.note_title = title;
        newNote.note_img = imgPath;
        newNote.note_description = description;
        newNote.note_link = link;
        newNote.create_at = timeConverter(new Date(), 'y-m-dTh:i:s:SZ');

        (varNotePage.editNote) && (newNote.note_id = varNotePage.currentNote.note_id);

        if (file.name) {
            const formData = new FormData();
            formData.append('upload_file', file);

            await noteAPI().uploadFile(formData)
                .then((res) => newNote.note_img = res.data);
        } else {
            (!varNotePage.editNote) &&  (newNote.note_img = "");
        }

        if (varNotePage.editNote) {
            noteAPI().update(newNote);
        } else {
            noteAPI().create(newNote);
        }

        const latest = {
            updated_at: timeConverter(new Date(), 'y-m-dTh:i:s:SZ'),
            note_box_id: newNote.note_box_id
        }
        noteBoxAPI().updateLatest(latest);

        varNotePage.setDetailNote(false);
        varNotePage.setCurrentNote(null);
        varNotePage.setCurrentNoteBox(null);
        varNotePage.reSetNoteBoxList();
    }
    const handleClickBtnCancel = (e) => {
        e.preventDefault();
        varNotePage.setDetailNote(false);
        if (varNotePage.editNote) {
            varNotePage.setEditNote(false);
        }
        varNotePage.setCurrentNote(null);
        varNotePage.setCurrentNoteBox(null);
    }

    return (
        <div className="g_loosen_up_child g_m_b1">
            <div className="g_header g_upcase g_center">
                {noteLang.note[lang]}
            </div>
            <div>
                <div className="g_label">
                    {noteLang.title[lang]}
                </div>
                <input
                    type="text"
                    className="g_input"
                    name="note_title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <div className="g_label">
                    {noteLang.img[lang]}
                </div>
                <input
                    type="file"
                    className="g_d_none"
                    id="img_to_upload"
                    name="note_img"
                    onChange={(e) => {
                        setFileChaged(true);
                        setFile(e.target.files[0]);
                        setImgPath(URL.createObjectURL(e.target.files[0]))
                    }}
                />
                <div>
                    <div className="g_d_flex">
                        <BtnChooseFile
                            handleClickBtnChooseFile={handleClickBtnChooseFile}
                        />
                        <span className="g_m_l1">{listOfNavBar.chooseFile.lang[lang]}</span>
                    </div>

                    <div className="g_img_container">
                        {imgPath && (<img 
                            className="g_img" 
                            src={(fileChanged) ? imgPath : ("/resources/uploads/"+ imgPath)} 
                            alt=""
                        />)}
                    </div>
                </div>
            </div>
            <div>
                <div className="g_label">
                    {noteLang.description[lang]}
                </div>
                <textarea
                    type="text"
                    className="g_textarea"
                    name="note_description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <div className="g_label">
                    {noteLang.link[lang]}
                </div>
                <input
                    type="text"
                    className="g_input"
                    name="note_link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
            </div>
            <div className="g_j-c_space-between g_d_flex g_m_t3">
                <BtnSave
                    handleClickBtnSave={handleClickBtnSave}
                />
                <BtnCancel
                    handleClickBtnCancel={handleClickBtnCancel}
                />
            </div>
        </div>
    )
}

export default DetailNote;