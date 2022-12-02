import {createContext} from 'react';
import './App.css';
import Layout from './Layouts';
import RoutersNav from './Routes/RoutersNav';
import * as IMAGE from "./Constants/IMAGE";

const user = JSON.parse(localStorage.getItem('YoleUser'))
let data = ['', Number(user.language)]
export const MyUserContext = createContext(undefined)

function App() {

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
