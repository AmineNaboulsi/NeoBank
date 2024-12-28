import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accounts from './layouts/Accounts'
import Home from './layouts/Home'
import Notfound from './layouts/Notfound'
function App() {

  return (
    <>
     <BrowserRouter>
   <Routes>
   <Route path='*' element={<Notfound />} />
    <Route path='/'>
      <Route index element={<Home />} />
    </Route>
    <Route path='/accounts' element={<Accounts />}></Route>
   </Routes>
   </BrowserRouter>


    </>
  )
}

export default App
