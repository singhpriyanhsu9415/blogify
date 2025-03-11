import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Register from './pages/Register';
import UserLayout from './Layout/UserLayout.js';
import AdminLayout from './Layout/AdminLayout.js';
import Admin from './pages/Admin/Admin.js';
import AddPosts from './pages/Admin/addPost.js';
import User from './pages/Admin/User.js';
import Navbar from './Components/Navbar.js';
import AllPost from './pages/AllPost.js';



function App() {
  return (
    
    <BrowserRouter>
    <Navbar></Navbar>
  <Routes>
  
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/dashboard' element={<Admin></Admin>}></Route>
        <Route path='/dashboard/addpost' element={<AddPosts/>}/>
        <Route path='/dashboard/users' element={<User/>}/>
        <Route path='/profile/:userId' element={<Profile/>}></Route>
        <Route path='/post/:postId' element={<Post/>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/allpost' element={<AllPost></AllPost>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
