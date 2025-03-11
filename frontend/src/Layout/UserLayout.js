import React from 'react'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Home from '../pages/Home'



 function UserLayout() {
  return (
 <div>
<Navbar/>
<BrowserRouter>
 <Routes>
    <Route path='/home' element={<Home></Home>}></Route>
 </Routes>
 </BrowserRouter>
 </div>
 
  )
}
export default {UserLayout}