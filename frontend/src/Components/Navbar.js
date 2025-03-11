import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const Navigate=useNavigate();
  const getUser=JSON.parse(localStorage.getItem('user'))
  async function handleclick() {
    try{
          const response=await axios.post(`https://blogify-1irc.onrender.com/auth/logout`)
          const user=localStorage.setItem('user',{});
          if(response.data.status===200){
            console.log("signout successfully"); 
          }
          Navigate('/');
    }catch(err){
           console.log(err);
    }
    
  }
    return (  
        <nav className="navbar d-flex justify-content-between bg-secondary  align-items-center ">
        <Link to={'/'}><h1 className="vh-10 text-white fs-2 fw-bold mx-3" >Blogify</h1></Link>
        <div className="d-flex align-items-center">
              <Link to='/login' className="btn_sign mx-1 text-center fs-5" style={{borderRadius:"10%",textDecoration:"none"}}>Login</Link> 
              <Link to='/register' className="btn_sign mx-1 text-center fs-5" style={{borderRadius:"10%",textDecoration:"none"}}>Signup</Link> 
              <div className="dropdown mx-5">
              <div className="avatar-container pointer rounded-circle overflow-hidden bg-info" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: '40px', height: '40px', cursor: "pointer" }}>
                <img 
                  className="img-fluid h-100 w-100" 
                  src='https://img.freepik.com/premium-photo/genius-worker-illustration-creative-genius-concept-brilliant-mind-graphic-innovative-thinker-artw_980716-58906.jpg?ga=GA1.1.314710026.1741268040&semt=ais_hybrid'
                  alt="Profile"
                  style={{objectFit:"cover"}}
                />
              </div>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                
                {/* <li><span className='text-bold fs-4 dropdown-item'>{user && user.FullName}</span></li> */}
                <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                <li><Link className="dropdown-item" >Profile</Link></li>
                <li><button className="dropdown-item "  style={{cursor:"pointer"}} onClick={handleclick}>Sign Out</button></li>
              </ul>
            </div>        
        </div>
      </nav>
    );
}

export default Navbar;