import {createContext} from 'react';
import './App.css';
import Layout from './Layouts';
import RoutersNav from './Routes/RoutersNav';
import {listOfNavBar} from './Constants/GlobalVariables';
import {useState} from "react";
import * as IMAGE from "./Constants/IMAGE";
import Authentication from "./Pages/Authentication";

let lang = 1;
let data = [listOfNavBar, lang]
export const MyUserContext = createContext(undefined)

function App() {
    // localStorage.setItem("YoleUser", {})

    return (
        <>
            <MyUserContext.Provider value={data}>
                <Layout>
                    <RoutersNav/>
                </Layout>
            </MyUserContext.Provider>
        </>

    );
}

export default App;
