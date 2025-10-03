import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getUserById } from "../../api/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import ClientList from "../../components/clients/ClientList";
import { getUserPrograms } from "../../api/users";


function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("active");
  const [programs,setPrograms] = useState([]);


  useEffect(()=> {
    const fetchPrograms = async () => {
      try{
        const data = await getUserPrograms(userId);
        setPrograms(data);
      }catch (error){
        console.error("Failed to fetch programs", error)
      }
    };
    fetchPrograms()
  },[userId]);

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
    return (
      <div className="spinner-grow spinner-grow-sm" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  // tu už máme user načítaného
  const filteredClients = (user.clients || []).filter((client) => {
    if (filter === "active") return client.active;
    if (filter === "passive") return !client.active;
    if (filter === "man") return client.sex === "MAN";
    if (filter === "woman") return client.sex === "WOMAN";
    if (filter === "all") return true;
    return client.program === filter;
  });

  return (
    <>
      <div className="container-fluid my-3 d-flex align-items-center">
        <div
          className="card bg-dark text-light shadow-lg"
          style={{ maxWidth: "400px", width: "100%" }}
        >
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
            </ul>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-outline-success btn-sm">Edit Profile</button>
          </div>
        </div>

        <Link to={`/add-client/${userId}`} className="btn btn-success">
          Add new client
        </Link>
        <Link to={`/add-note/${userId}`} className="btn btn-success">
          Add note
        </Link>
        <Link to={`/all-notes/${userId}`} className="btn btn-success">
          All notes
        </Link>
      </div>

      <div className="container-fluid">
        <hr />
        <h2 className="text-center text-success mb-4">Your Clients</h2>
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link text-success ${filter === "active" ? "active" : ""}`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link text-danger ${filter === "passive" ? "active text-danger" : ""}`}
              onClick={() => setFilter("passive")}
            >
              Passive
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link text-success ${filter === "man" ? "active" : ""}`}
              onClick={() => setFilter("man")}
            >
              Man
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link text-success ${filter === "woman" ? "active" : ""}`}
              onClick={() => setFilter("woman")}
            >
              Woman
            </button>
          </li>
              <li className="nav-item dropdown">
                <a className="nav-link text-success dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">
                  Programs
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" onClick={() => setFilter("all")}>
                      All Programs
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  {programs.map((program, index) => (
                    <li key={index}>
                      <button className="dropdown-item" onClick={() => setFilter(program)}>
                        {program}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
        </ul>

        <ClientList clients={filteredClients} />
      </div>
    </>
  );
}

export default UserProfile;