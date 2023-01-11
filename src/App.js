import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Edit from "./pages/Edit";
import FourOFour from "./pages/FourOFour";
import Index from './pages/Index'
import New from "./pages/New";
import Show from "./pages/Show";


function App(){
  return(
    <div className="App">
      <Router>
        <NavBar/>
        <main>
          <Routes>
            <Route path='/transactions' element={<Index/>}/>
            <Route path='/transactions/:index' element={<Show/>}/>
            <Route path="/transactions/new" element={<New/>} />
            <Route path='/transactions/:index/edit' element={<Edit/>}/>
            <Route path='/*' element={<FourOFour/>}></Route>
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App


// create model 
// budget model consists of arrays of information

//create controllers
// controller needs get use post delete and put 

//controller to app js
//app js main route , use, and 404

