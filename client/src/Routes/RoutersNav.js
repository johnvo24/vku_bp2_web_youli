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
import SignIn from "../Components/Authorization/SignIn";
import SignUp from "../Components/Authorization/SignUp";

function RoutersNav() {

    return (
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/note" element={<NotePage/>}></Route>
            <Route path="/schedule" element={<SchedulePage/>}></Route>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/goal" element={<GoalPage/>}></Route>
            <Route path="/budget" element={<BudgetPage/>}></Route>
            <Route path='/sign-in' element={<SignIn/>}></Route>
            <Route path='/sign-up' element={<SignUp/>}></Route>
            <Route path="/*" element={<NoPage/>}></Route>
        </Routes>
    )
}

export default RoutersNav;