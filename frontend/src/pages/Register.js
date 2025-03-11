import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Register () {
  const [FullName, setFullName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [profile, setprofile] = useState(null);
  const Navigate=useNavigate();
  
  const handleImageChange = (e) => {
    setprofile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('FullName', FullName);
    formData.append('email', email);
    formData.append('password', password);
    
    if (profile) {
      formData.append('profile', profile);
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Registration successful!');
      Navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed.');
    }
  };

    return ( 
         <div>
            <section className="bg-light">
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
          <a href="#" className="mb-4 text-dark text-decoration-none d-flex align-items-center">
            <img className="me-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" width="32" height="32" />
            <Link to={'/'}> <span className="h4 mb-0 fw-bold">Blogify</span></Link> 
          </a>
          <div className="card shadow-sm w-100" style={{ maxWidth: '400px' }}>
            <div className="card-body p-4">
              <h1 className="h5  fw-bold text-dark">Create an account</h1>
              <form  onSubmit={handleSubmit}>
                <div className=" text-center">
                  <label htmlFor="image" className="form-label">Profile Picture</label>
                  <div className="d-flex justify-content-center ">
                    <img 
                      src= 'https://via.placeholder.com/150'
                      alt="avatar" 
                      className="rounded-circle" 
                      width="100" 
                      height="100"
                      style={{ cursor: 'pointer' }}
                            
                    />
                  </div>
                  <input type="file" id="profile" onChange={handleImageChange} accept="image/*" />
                </div>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="fullName" 
                    placeholder="John Doe" 
                    
                    value={FullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    
                    
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                    
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign up</button>
              </form>
              <p className="mt-3 mb-0 text-muted">
                Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
         </div>
     );
}

export default Register;