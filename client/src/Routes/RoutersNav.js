import {Routes, Route} from "react-router-dom"

// Components
import SchedulePage from "../Pages/SchedulePage";
import NotePage from "../Pages/NotePage";
import HomePage from "../Pages/HomePage";
import GoalPage from "../Pages/GoalPage";
import BudgetPage from "../Pages/BudgetPage";
import NoPage from "../Pages/NoPage";
import {useState} from "react";
import * as IMAGE from "../Constants/IMAGE";

function RoutersNav() {

    const [user, setUser] = useState({
        UID: '1',
        displayName: 'Dang cap',
        username: 'abc',
        password: '122',
        avatar: IMAGE.avatar,
        email: 'abc@a.com',
        phone: '01231',
        introduction: 'daubuoi',
        creatAt: '12/10/22 12:00'
    })

    return (
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/note" element={<NotePage/>}></Route>
            <Route path="/schedule" element={<SchedulePage/>}></Route>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/goal" element={<GoalPage/>}></Route>
            <Route path="/budget" element={<BudgetPage user={user}/>}></Route>
            <Route path="/*" element={<NoPage/>}></Route>
        </Routes>
    )
}

export default RoutersNav;