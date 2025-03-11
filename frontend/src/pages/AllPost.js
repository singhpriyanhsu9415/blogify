import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { FaTrashAlt, FaEdit } from 'react-icons/fa';


function AllPost() {
    const [posts, setposts] = useState([]);
    

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get("https://blogify-1irc.onrender.com/blog/GetPosts") // Replace with your API endpoint
            const data=response.data;
            setposts(data.posts);
            console.log(data)
          } catch (err) {
            console.error('Error fetching posts:', err);
          }
        };
    
        fetchPosts();
      }, []);

      
      async function   handleDelete(postid)  {
          try {
            // Replace with your actual API endpoint
            const response = await axios.delete(`https://blogify-1irc.onrender.com/blog/delete/${postid}`);
      
            if (response.status === 204) {
              // Success (204 No Content is a common success status for DELETE)
              console.log("post is deleted successfully")// Notify parent component to update the list
            } else {
              console.error('Failed to delete item:', response);
              alert('Failed to delete item');
            }
          } catch (error) {
            console.error('Error deleting item:', error);
            alert('An error occurred while deleting the item.');
          }
        };

    return ( 
        <>
        <div className="container ">
      <h1 className="text-center mb-4 text-white">All Posts</h1>
      <div className="row">
        
        {posts && posts.map((post) => (
         

          <div className="col-md-4 mb-4" key={post.id}>
              
            <div className="card h-100">
            <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={`https://blogify-1irc.onrender.com/images/${post.image}`}  className="card-img-top" alt="img" />
             
              <div className="card-body">
              
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.desc}</p>
               
              </div>
              </Link>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-danger"
                 onClick={()=>handleDelete(post._id)}
                >
                  <FaTrashAlt /> Delete
                </button>
                <button
                  className="btn btn-warning"
                  
                >
                  <FaEdit /> Update
                </button>
              </div>
            </div>
           
          </div>
        
        ))}
      </div>
    </div>
    </>
     );
}

export default AllPost;