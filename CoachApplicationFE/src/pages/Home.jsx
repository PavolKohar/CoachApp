import { Link } from "react-router-dom";

function Home() {
return (
    <div className="container-fluid bg-light d-flex align-items-center justify-content-center min-vh-100">
        <div className="container bg-dark p-5 rounded shadow text-center text-light">
            <h1 className="display-3">Coach Application</h1>
            <p className="lead">This is app created for trainers! You can record progress of your clients and planing them their training plans </p>
            <hr className="my-4"/>
            <p>Are you ready? Just click</p>
            <Link className="btn btn-success btn-lg" to="/register" role="button">Register</Link>
        </div>
    </div>
);
}

export default Home;    