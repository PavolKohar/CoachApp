import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getUserById } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ClientList from "../../components/clients/ClientList";
import { getUserPrograms } from "../../api/users";
import { getTodayTrainingsforUser } from "../../api/training";
import TrainingListSmall from "../../components/trainings/TrainingListSmall";


function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("active");
  const [programs,setPrograms] = useState([]);
  const [trainings,setTrainings] = useState([]);
  const navigate = useNavigate();
  const [selectedTraining, setSelectedTraining] = useState(null)
 


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
    const fetchTrainings = async () => {
      try {
        const data = await getTodayTrainingsforUser(userId);
        setTrainings(data);
        console.log(data);
        
        
      } catch (err) {
        console.error("Error loading trainings", err);
      }
    };

    fetchTrainings();
  }, [userId]);

  const handleDoneButton = () => {
    const fetchTrainingsAct = async () => {
      try {
        const updateTrainings = await getTodayTrainingsforUser(userId);
        setTrainings(updateTrainings);
      }catch(error){
        console.error("Error in user page with updating trainings" , error)
      }
    }
    fetchTrainingsAct();
  }



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

  const handleClickTraining = (id) =>{
    navigate(`/training/${id}`)
  }

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

<div className="container my-4">
  <div className="row g-3 align-items-stretch">
    {/* Profile Card */}
    <div className="col-md-5 col-lg-4">
      <div className="card bg-dark text-light shadow-lg h-100">
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
          <Link to={`/edit-user/${userId}`} className="btn btn-outline-success btn-sm">Edit Profile</Link>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="col-md-7 col-lg-8">
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex  flex-wrap gap-3 justify-content-center align-items-center">
          <Link to={`/add-client/${userId}`} className="btn btn-success">
            ➕ Add Client
          </Link>
          <Link to={`/add-note/${userId}`} className="btn btn-primary">
            📝 Add Note
          </Link>
          <Link to={`/all-notes/${userId}`} className="btn btn-warning">
            📋 All Notes
          </Link>
          <Link to={`/trainings/${userId}/plans/new`} className="btn btn-info">
            🏋️‍♂️ Training Plan
          </Link>
            <Link to={`/trainings/${userId}/new`} className="btn btn-info">
            🏋️‍♂️ New Training
          </Link>
        </div>
      </div>
    </div>
            <div className="d-flex justify-content-between align-items-center mb-1">
            <h3 className="mb-0">Today trainings</h3>
            <Link className="btn btn-success" to={`/trainings/${userId}/all`}>
            All trainings
            </Link>
        </div>
    <TrainingListSmall trainings={trainings} onDoneClick={handleDoneButton} onTrainingClick={handleClickTraining}/>
  </div>
</div>

      <div className="container-fluid">
        <hr className="mt-0"/>
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