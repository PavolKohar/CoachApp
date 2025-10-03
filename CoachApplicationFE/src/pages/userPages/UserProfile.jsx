import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getUserById } from "../../api/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import ClientList from "../../components/clients/ClientList";



function UserProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const data = await getUserById(userId, token);
                setUser(data);
                console.log("Fetched user data:", data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, [userId]);

    if (!user) {
        return <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
    }   



    return (
        <>
        
  <div className="container-fluid my-3 d-flex align-items-center">
  <div className="card bg-dark text-light shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
    <div className="card-header bg-success text-white text-center">
      <h4 className="mb-0">Welcome, {user.username} 👋</h4>
    </div>
    <div className="card-body">
      <ul className="list-group list-group-flush">
        <li className="list-group-item bg-dark text-light d-flex justify-content-between">
          <strong>Email:</strong> <span>{user.email}</span>
        </li>
        <li className="list-group-item bg-dark text-light d-flex justify-content-between">
          <strong>Phone:</strong> <span>{user.phoneNumber}</span>
        </li>
        {/* Môžeš doplniť ďalšie polia */}
      </ul>
    </div>
    <div className="card-footer text-center">
      <button className="btn btn-outline-success btn-sm">Edit Profile</button>
    </div>
  </div>

  <Link to={`/add-client/${userId}`} className="btn btn-success">Add new client</Link>
  <Link to={`/add-note/${userId}`} className="btn btn-success">Add note</Link>
  <Link to={`/all-notes/${userId}`} className="btn btn-success">All notes</Link>

  

  </div>
  <div className="container-fluid">


  
  <hr />
  <h2 className="text-center text-success mb-4">Your Clients</h2>
    <div className="dropdown">
      <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuDark" data-bs-toggle="dropdown" aria-expanded="false">
        Nefunkčné - filtrovanie klientov
      </button>
      <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
        <li><a className="dropdown-item" href="#">Active</a></li>
        <li><a className="dropdown-item" href="#">Passive</a></li>
        <li><a className="dropdown-item" href="#">Man</a></li>
        <li><a className="dropdown-item" href="#">Woman</a></li>
      </ul>
    </div>
   
    <ClientList clients={user.clients || []} />
  





  </div>

</>
  );
}

export default UserProfile;