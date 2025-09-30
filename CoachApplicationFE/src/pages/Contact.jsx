import { Link } from "react-router-dom";
function Contact() {
  return (
     <>

        <div className="container-fluid bg-dark text-white py-5">
        <div className="container text-center">
            <h1 className="display-4">Contact Us</h1>
            <p className="lead">We'd love to hear from you. Let's get in touch!</p>
        </div>
        </div>

   
        <div className="container my-5">
        <div className="row">

            
            <div className="col-md-5 mb-4">
            <h3>Contact</h3>
            <p>👤 Pavol Kohár<br/>

                📞 +421 918 842 226<br/>
                ✉️ koharpavol98@gmail.com
            </p>

            </div>

          
            <div className="col-md-7">
            <h3>Send Us a Message</h3>
            <form >
                <div className="form-floating mb-3">
                <input type="text" className="form-control" id="name" placeholder="Your Name" required/>
                <label for="name">Your Name</label>
                </div>

                <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="name@example.com" required/>
                <label for="email">Email address</label>
                </div>

                <div className="form-floating mb-3">
                <textarea className="form-control" placeholder="Leave a message here" id="message" style={{height: "120px"}} required></textarea>
                <label for="message">Your Message</label>
                </div>

                <button type="submit" className="btn btn-success">Send Message</button>
            </form>
            </div>
        </div>
        </div>

    
        <div className="container-fluid bg-secondary text-white text-center py-4">
        <p className="mb-2">Looking for fitness solutions for your clients?</p>
        <Link to="/register"className="btn btn-light btn-lg">Join Us Now</Link>
        </div>

  </>
  );
}

export default Contact; 