import React ,{useState}from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Login () {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://blogify-1irc.onrender.com/auth/login', {
        email,
        password,
      });

      // Store the JWT token in local storage or a cookie
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      toast.success('Login successful!');

      // Redirect to the dashboard or home page based on user role
      if (response.data.user.role === 'admin' || response.data.user.role === 'editor') {
        Navigate('/dashboard');
      } else {
        Navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid credentials.');
    }
  };
    return ( 
         <>
          <section className="bg-light">
                <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
                    <a href="#" className="mb-4 text-dark text-decoration-none d-flex align-items-center">
                        <img className="me-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" width="32" height="32" />
                        <Link to={'/'}> <span className="h4 mb-0 fw-bold">Blogify</span></Link>
                    </a>
                    <div className="card shadow-sm w-100" style={{ maxWidth: '400px' }}>
                        <div className="card-body p-4">
                            <h1 className="h5 mb-4 fw-bold text-dark">Sign in to your account</h1>
                            <form  onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Your email</label>
                                    <input
                                        type="email"
                                        name='email'
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        placeholder="name@company.com"
                                        onChange={(e)=>setemail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        name='password'
                                        className="form-control"
                                        id="password"
                                        placeholder="••••••••"
                                        onChange={(e)=>setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    {/* Optional content can be added here */}
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Sign in</button>
                            </form>
                            <p className="mt-3 mb-0 text-muted">
                                Don’t have an account yet? <Link to="/register" className="text-primary">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
         </>
     );
}

export default Login;