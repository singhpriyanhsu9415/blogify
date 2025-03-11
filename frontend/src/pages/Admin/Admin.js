import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import axios from 'axios';

function Admin() {
  const [post,setPost]=useState([])
  const [users,setUsers]=useState([])
  const [comments,setComments]=useState([])
   console.log(post)
   useEffect(()=>{
     const GetData=async()=>{
       try {
         const request= await axios.get('http://localhost:5000/dashboard')
         const response= request.data
 
         console.log(response)
         if (request.status===200) {
           setPost(response.Posts)
           setUsers(response.Users)
           setComments(response.comments)
         }
       } catch (error) {
         console.log(error)
       }
     }
     GetData()
   },[])
    return ( <>
   <div className='d-flex'>
    <Sidebar></Sidebar>
    <div className='container' style={{ width:"100%"}}>
    <h2 className="mb-4 text-white">Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card bg-primary text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">{users?users.length:"0"} </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">Total Posts</h5>
              <p className="card-text">{post ?  post.length:"0"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">Total Comments</h5>
              <p className="card-text">{comments?comments.length:"0"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
   
   </div>
    </> );
}

export default Admin;