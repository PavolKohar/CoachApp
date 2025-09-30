import { Link } from "react-router-dom";

function Login() {
    return (
   <>
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
                <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                    <h2 className="text-center text-primary mb-4">Login</h2>

                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
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