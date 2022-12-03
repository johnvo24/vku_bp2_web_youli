import { useContext } from 'react';
import { confirmDialog } from '../../../Constants/languages/GlobalWord';
import { getLanguage } from '../../../Middlewares/Middlewares';
import { NotePageContext } from '../../../Pages/NotePage';
import BtnNo from '../../Pieces/Buttons/BtnNo';
import BtnYes from '../../Pieces/Buttons/BtnYes';

function ConfirmationDialog({ children, deleteFunction }) {
    const varNotePage = useContext(NotePageContext);

    const handleClickBtnYes = async (e) => {
        e.preventDefault();
        deleteFunction();
        varNotePage.setConfirmDialog(false);
        varNotePage.setCurrentNoteBox(null);
        varNotePage.setCurrentNote(null);
        varNotePage.reSetNoteBoxList();
    }
    const handleClickBtnNo = (e) => {
        e.preventDefault();
        varNotePage.setCurrentNoteBox(null);
        varNotePage.setCurrentNote(null);
        varNotePage.setConfirmDialog(false);
    }

    return (
        <div className="g_dialog">
            <div className="g_header g_center">
                {confirmDialog[getLanguage('YoleUser')]}
            </div>
            <div className="g_message_dialog">
                { children }
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