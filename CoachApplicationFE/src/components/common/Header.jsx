import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyHeader() {
  const { user, logoutUser } = useAuth();
  const [logoutMessage, setLogoutMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setLogoutMessage("You have been logged out successfully.");
    setShowAlert(true);
 
    navigate("/");
    setTimeout(() => setShowAlert(false), 3000); // Alert zmizne po 3 sekundách
  };



  return (
    <header>
      {showAlert && (
        <div className="alert alert-info text-center mb-0" role="alert">
          {logoutMessage}
        </div>
      )}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

          {/* Logo vľavo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/src/assets/cAPP-logo.png" alt="logo" style={{ height: "40px", width: "auto" }} />
          </Link>

          {/* Tlačidlo pre mobil */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-2">

              {/* Linky vpravo */}
              <li className="nav-item">
                <Link className="nav-link" to="/about">About us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>

              {/* Prihlásený používateľ */}
              {user ? (
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.username}
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <span className="dropdown-item" role="button" onClick={handleLogout}>
                        Logout
                      </span>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" id="loginButton" className="btn btn-primary d-flex align-items-center">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" id="registerButton" className="btn btn-success d-flex align-items-center">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MyHeader;