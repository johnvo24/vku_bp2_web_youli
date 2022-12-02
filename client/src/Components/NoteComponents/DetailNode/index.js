import { useContext, useEffect, useState } from "react";
import noteAPI from "../../../api/noteAPI";
import { listOfNavBar } from "../../../Constants/GlobalVariables";
import { noteLang } from "../../../Constants/languages/NoteLanguages";
import { getCurrentUser, getLanguage } from "../../../Middlewares/Middlewares";
import { NotePageContext } from "../../../Pages/NotePage";
import BtnChooseFile from "../../Pieces/Buttons/BtnChooseFile";
import BtnDelete from "../../Pieces/Buttons/BtnDelete";
import BtnSave from "../../Pieces/Buttons/BtnSave";


function DetailNote() {
    const varNotePage = useContext(NotePageContext);
    let lang = getLanguage('YoleUser')
    const [title, setTitle] = useState("");
    const [file, setFile] = useState({});
    const [imgPath, setImgPath] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const newNote = {};

    const handleClickBtnChooseFile = (e) => {
        e.preventDefault();
        document.getElementById("img_to_upload").click();
    }

    useEffect(() => {
        newNote.note_box_id = varNotePage.currentNoteBox.note_box_id;
        newNote.note_title = title;
        newNote.note_description = description;
        newNote.note_link = link;
    }, [title, file, description, link])

    const handleClickBtnSave = async (e) => {
        e.preventDefault();
        if(file.name) {
            const formData = new FormData();
            formData.append('upload_file', file);
    
            await noteAPI().uploadFile(formData)
                .then((res) => newNote.note_img = res.data);
        }else {
            newNote.note_img = "";
        }  
        noteAPI().create(newNote);

        varNotePage.setDetailNote(false);
        varNotePage.reSetNoteBoxList();
    }
    const handleClickBtnDelete = (e) => {
        e.preventDefault();
        varNotePage.setDetailNote(false);
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
                        {imgPath && (<img className="g_img" src={imgPath} alt="" />)}
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
                <BtnDelete
                    handleClickBtnDelete={handleClickBtnDelete}
                />
            </div>
        </div>
    )
}

export default DetailNote;