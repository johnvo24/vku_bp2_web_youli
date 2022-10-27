import {Routes, Route} from "react-router-dom"
import SchedulePage from "../Pages/SchedulePage";
import NotePage from "../Pages/NotePage";
import HomePage from "../Pages/HomePage";
import GoalPage from "../Pages/GoalPage";
import BudgetPage from "../Pages/BudgetPage";
import NoPage from "../Pages/NoPage";

function RoutersNav() {
    
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/note" element={<NotePage />}></Route>
            <Route path="/schedule" element={<SchedulePage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/goal" element={<GoalPage />}></Route>
            <Route path="/budget" element={<BudgetPage />}></Route>
            <Route path="/*" element={<NoPage />}></Route>
        </Routes>
    )
}

export default RoutersNav;