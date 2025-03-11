import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Post () {
  
  const { postId } = useParams();  // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getUser=JSON.parse(localStorage.getItem('user'))

  console.log(getUser)

  useEffect(() => {
    if (!postId) return; // Don't fetch if ID is not yet available
    

    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/GetSinglePost/Singlepost/${postId}`); // Replace with your API endpoint
        setPost(response.data.Post);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error('Error fetching post:', err);
      }
    };

    fetchPost();
  }, [postId]); // Run effect when 'id' changes

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  
  const onSubmitComment = async (e) => {
    e.preventDefault();
    
   
      try {
        const request = await axios.post("http://localhost:5000/comment/addcomment", {
          postId:postId,
          userId: getUser._id,
          comment:comment,
        });
        const response = request.data;
        console.log(response);
        
        if (response.success) {
          // alert(response.message);
          toast.success(response.message)
          setComment('')
        }
      } catch (error) {
        console.log(error);

      }
    
    
  };

    return ( 
        <div className="container text-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-12">
            <h1 className="fw-bold text-white mb-4 display-4">{post.title}</h1>
            <img 
              src={`http://localhost:5000/images/${post.image}`} 
              alt="Exploring the Art of Writing" 
              className="img-fluid mb-4" 
              style={{ borderRadius: "10px", maxHeight: "500px", objectFit: "cover", width: "100%" }}
            />
            
            <p className="mb-5">{post.desc}</p>
  
            {/* <div className="bg-dark p-4 rounded mb-5">
              <h2 className="text-white mb-4">Big Dedication</h2>
              <p className="mb-0">Dedication is key to mastering the art of writing. As with any craft, the more you practice, the better you become. This article encourages you to write daily, seek feedback, and never stop learning. Your dedication to improving your writing skills will be rewarded with clearer, more compelling communication.</p>
            </div> */}
  
            <hr />
  
            <h3 className="mt-5 mb-4">Leave a comment</h3>
            
            <form>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Comment</label>
              <textarea className="form-control" id="comment" rows="4" placeholder="Write your comment here" required
               value={ comment}  onChange={(e)=>setComment(e.target.value)}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" onClick={onSubmitComment}>Submit Comment</button>
          </form>
  
            <hr />
  
            <h3 className="mt-5 mb-4">Comments</h3>
         
            {post && post.comments && post.comments.map((elem)=>{
          return(
            <div className="bg-secondary p-3 rounded mb-3 d-flex">
            <img 
             src={`http://localhost:5000/images/${elem.userId.profile}`}
              alt="John Doe" 
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <div>
              <h5 className="mb-1">{elem.userId.FullName}</h5>
              <p className="mb-0">{elem.comment}</p>
            </div>
          </div>
          )
         })}
            </div>
            
         
         
        
          </div>
        </div>
      
     );
}

export default Post;