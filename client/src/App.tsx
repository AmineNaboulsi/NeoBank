import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddAccount from './layouts/AddAccount'
import Accounts from './layouts/Accounts'
import Home from './layouts/Home'
import Contract from './layouts/Contract'
import Notfound from './layouts/Notfound'
function App() {

  return (
    <>
     <BrowserRouter>
   <Routes>
    <Route path='/'>
      <Route index element={<Home />} />
      <Route path='/contract' element={<Contract />} />
      <Route path='*' element={<Notfound />} />
    </Route>
    <Route path='/accounts' element={<Accounts />}>
          <Route path='/accounts/addaccount' element={<AddAccount />} />
          </Route>
   </Routes>
   </BrowserRouter>


    </>
  )
}

export default App
