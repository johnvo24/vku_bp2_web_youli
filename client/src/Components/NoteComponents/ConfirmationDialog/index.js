import { useContext } from 'react';
import noteBoxAPI from '../../../api/noteBoxAPI';
import { confirmDialog } from '../../../Constants/languages/GlobalWord';
import { noteLang } from '../../../Constants/languages/NoteLanguages';
import { getLanguage } from '../../../Middlewares/Middlewares';
import { NotePageContext } from '../../../Pages/NotePage';
import BtnNo from '../../Pieces/Buttons/BtnNo';
import BtnYes from '../../Pieces/Buttons/BtnYes';

function ConfirmationDialog({ children }) {
    const varNotePage = useContext(NotePageContext);

    const handleClickBtnYes = (e) => {
        e.preventDefault();
        noteBoxAPI().clean();
        varNotePage.setConfirmDialog(false);
        varNotePage.reSetNoteBoxList();
    }
    const handleClickBtnNo = (e) => {
        e.preventDefault();
        varNotePage.setConfirmDialog(false);
    }

    return (
        <div className="g_dialog">
            <div className="g_header g_center">
                {confirmDialog[getLanguage('YoleUser')]}
            </div>
            <div className="g_message_dialog">
                {noteLang.noteBoxMessengeDialog[getLanguage('YoleUser')]}
                <div className="g_option_btn">
                    <BtnYes
                        handleClickBtnYes={handleClickBtnYes}
                    />
                    <BtnNo
                        handleClickBtnNo={handleClickBtnNo}
                    />
                </div>
            </div>
        </div>
    )
}

export default ConfirmationDialog;