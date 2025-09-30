import { Link } from "react-router-dom";



function Header() {
  return (
<header>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/"><img src="/src/assets/cAPP-logo.png" alt="logo" width="100" height="auto" /></Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center gap-2">
          <li className="nav-item">
            <Link className="nav-link" to="/about">About us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/login" className="btn btn-primary d-flex align-items-center">Login</Link>
          </li>
          <li>
            <Link to="/register" className="btn btn-success d-flex align-items-center">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
  );
}

export default Header;