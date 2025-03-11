import React,{useState,useEffect} from 'react'
import Sidebar from '../../Components/Sidebar';
import axios from 'axios';

function User() {
    // const users = [
    //     { id: 1, name: 'John Doe', email: 'john@example.com' },
    //     { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    //     { id: 3, name: 'Michael Brown', email: 'michael@example.com' },
    //     // Add more users as needed
    //   ];

      const [Users,setUsers]=useState([])
      const [loadedata,setLoadedata]=useState(false)

      useEffect(()=>{
        const getuser=async()=>{
          try {
              const resposne= await axios.get("https://blogify-1irc.onrender.com/dashboard/users")
              const data= resposne.data
              setUsers(data.Users)
              console.log(data)
          } catch (error) {
            console.log(error)
          }
        }
        getuser()
       },[loadedata])
    return ( 

       <div className='d-flex'>
        <Sidebar></Sidebar>
        <div className="container ">
      <h1 className=" text-white mb-4">Users</h1>
      <div className="table-responsive">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Users && Users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.FullName}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
       </div>
     );
}

export default User;