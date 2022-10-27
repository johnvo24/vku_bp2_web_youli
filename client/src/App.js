import { createContext } from 'react';
import './App.css';
import Layout from './Layouts';
import RoutersNav from './Routes/RoutersNav';
import { listOfNavBar } from './Constants/GlobalVariables';

const data = [listOfNavBar]
export const MyUserContext = createContext()

function App() {
  return (
    <MyUserContext.Provider value={data}>
      <Layout>
          <RoutersNav />
      </Layout>
    </MyUserContext.Provider>
  );
}

export default App;
