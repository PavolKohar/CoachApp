import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <>
   
<div className="container-fluid bg-dark text-white py-5">
  <div className="container text-center">
    <h1 className="display-4">About Us</h1>
    <p className="lead">We are passionate about helping people live healthier and more active lives.</p>
  </div>
</div>


<div className="container my-5">
  <div className="row">
    <div className="col-md-6">
      <h2>Our Mission</h2>
      <p>
        Our mission is to provide an intuitive platform for personal trainers and clients to track
        progress, manage workout plans, and achieve fitness goals faster and smarter.
      </p>
      <p>
        We believe that clear data, consistent feedback, and well-designed tools make a difference in every journey.
      </p>
    </div>
    <div className="col-md-6">
      <h2>What We Offer</h2>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">📊 Progress tracking and body metrics</li>
        <li className="list-group-item text-muted ">📝 Custom training plans <span className="badge bg-secondary">soon</span> </li>
        <li className="list-group-item">📅 Built-in training calendar</li>
        <li className="list-group-item">🔒 Secure login and data privacy</li>
      </ul>
    </div>
  </div>

 
  <div className="text-center mt-5">
    <Link to="/register" className="btn btn-success btn-lg">Join Us Today</Link>
  </div>
</div>
    
    
    
    
    </>
  );
}

export default AboutUs; 