import { Link } from "react-router-dom";
import { loginUserAPI } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {

    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState("");
    const { loginUser } = useAuth();
    const navigate = useNavigate();

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUserAPI(credentials);
            loginUser(data.token);
            const decoded = jwtDecode(data.token);
            const userId = decoded.userId;
            navigate(`/profile/${userId}`);
        } catch (error) {
                setError("Invalid username or password"); 
                console.error("Login error:", error);
        }
    };   


    return (
   <>
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
                <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                    <h2 className="text-center text-primary mb-4">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                id="username"
                                placeholder="Enter your username"
                                onChange={handleChange}
                                value={credentials.username}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                value={credentials.password}
                                required
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>

                    <div className="text-center mt-3">
                        <small>
                            Don't have a account ? <Link to="/register">Register</Link>
                        </small>
                    </div>
                </div>
            </div>
        </>
    );
  }
  
  export default Login;