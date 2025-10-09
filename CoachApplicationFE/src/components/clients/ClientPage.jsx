import { getClientById } from "../../api/clients";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateCurrentWeight } from "../../api/clients";
import WeightList from "./WeightList";
import { Link } from "react-router-dom";
import WeightChart from "./WeightChart";
import { toggleActive} from "../../api/clients";
import { getClientTrainings } from "../../api/training";
import TrainingListSmall from "../trainings/TrainingListSmall";
import { useNavigate } from "react-router-dom";
import { getTrainingPlansForClient } from "../../api/training";
import TrainingPlanList from "../trainings/TrainingPlanList";
import { getUndoneClientTrainings } from "../../api/training";

function ClientPage(){
    const { clientId } = useParams();
    const [client, setClient] = useState(null);
    const [newWeight, setNewWeight] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [weightData, setWeightData] = useState([]);
    const [showChart, setShowChart] = useState(false);
    const [trainings,setTrainings] = useState([]);
    const [plans,setPlans] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchClient = async () => {
            try {
                const data = await getClientById(clientId);
                const trainingData = await getUndoneClientTrainings(clientId);
                setTrainings(trainingData);
                setClient(data);
                const weightData = data.weightResponses.map(w=> ({
                      date: w.date,
                      weight: w.newWeight
                    }));
                    setWeightData(weightData)
                if(data && data.currentWeight !== undefined){
                    setNewWeight(data.currentWeight);
                  
                }
                console.log("Fetched client data:", data);
            } catch (error) {
                if(error.response?.status === 403){
                  navigate("/forbidden")
                }
                console.error("Error fetching client data:", error);
            }
        };

        fetchClient();
    }, [clientId]);

      const handleActiveButton = () => {
        const fetchClientAct = async () => {
          try {
            await toggleActive(clientId); // len toggle
            const updatedClient = await getClientById(clientId); // načítaj komplet
            setClient(updatedClient);

            const weights = updatedClient.weightResponses.map(w => ({
              date: w.date,
              weight: w.newWeight
            }));

            setWeightData(weights);

          } catch (error) {
            console.error("Error activating client:", error);
          }
        };

        fetchClientAct();
      };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setNewWeight(value);    
    };

    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await updateCurrentWeight(clientId, newWeight); // váha sa aktualizuje na backende
    const updatedClient = await getClientById(clientId);
                    const weightData = updatedClient.weightResponses.map(w=> ({
                      date: w.date,
                      weight: w.newWeight
                    }));
                    setWeightData(weightData) // získa sa aktualizovaný klient
    setClient(updatedClient); // stav klienta sa aktualizuje s novými dátami
    
    setSuccessMessage("Weight updated successfully to " + newWeight + " kg");
    setErrorMessage("");
    setTimeout(() => {
        setSuccessMessage("");
    }, 3000); // správa zmizne po 3 sekundách
    
    
  } catch (error) {
    console.error("Error updating weight:", error);
    setErrorMessage("Failed to update weight. Please try again.");
    setSuccessMessage("");
    setTimeout(() => {
        setErrorMessage("");
    }, 3000); // správa zmizne po 3 sekundách
    
  }
    };

    const handleDeleteWeightRecord = (idToDelete) =>{
  const updatedWeightRecords = client.weightResponses.filter(w=> w.id !== idToDelete);
  const updatedClient = {...client, weightResponses: updatedWeightRecords};
  setClient(updatedClient)

  const updatedChartData = weightData.filter(w=> w.id !== idToDelete);
  setWeightData(updatedChartData)
    }

    useEffect(() => {
      const fetchPlans = async () => {
        try{
        const planData = await getTrainingPlansForClient(clientId);
        setPlans(planData);
        }catch (error){
          console.error("Error fetching plans", error)
        }

      }
      fetchPlans();
    },[clientId])

    const handleDoneButton = () => {
    const fetchTrainingsAct = async () => {
      try {
        const updateTrainings = await getUndoneClientTrainings(clientId);
        setTrainings(updateTrainings);
        const updatedPlans = await getTrainingPlansForClient(clientId);
        setPlans(updatedPlans)
      }catch(error){
        console.error("Error in user page with updating trainings" , error)
      }
    }
    fetchTrainingsAct();
  }

    const handleClickTraining = (id) =>{
    navigate(`/training/${client.userId}/${id}`)
  }



    if (!client) {
        return <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>;
    }

    return (
  <div className="container mt-4">
 <h2 className="text-center text-success mb-4">
  {client.firstName} {client.lastName} Details
  <span className={`badge rounded-pill ms-3 ${client.active ? 'bg-success' : 'bg-danger'}`}>
    {client.active ? "Active" : "Passive"}
  </span>
</h2>
    {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

  <div className="card shadow">
    <div className="card-body">

      {/* PROGRESS BAR */}
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h5 className="mb-0">Progress <small className={`${client.totalProgress ? 'text-success' : 'text-danger'}`} >{client.weightDifference} kg</small> </h5>
        <div className="d-flex gap-2 align-items-center"> 
          <strong>Activity Level:</strong> {client.activityLevel}

          <div className="dropdown">
              <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuDark" data-bs-toggle="dropdown" aria-expanded="false">
                ⚙️
              </button>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
                <li><Link className="dropdown-item" to={`/clients/edit/${client.userId}/${client.clientId}`}>Edit client</Link></li>
                <li><a className="dropdown-item" href="#">Statistic</a></li>
                <li><Link className="dropdown-item" to={`/trainings/${client.userId}/plans/new`}>Create training plan</Link></li>
                <li>
                      <button
                        className={`dropdown-item ${client.active ? 'text-danger' : 'text-success'}`}
                        onClick={handleActiveButton}
                      >
                        {client.active ? 'Deactivate' : 'Activate'}
                      </button>
                </li>
              </ul>
            </div>
          </div>
      </div>
      
      <div className="progress mb-4" style={{ height: "25px" }}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${client.progress}%` }}
          aria-valuenow={client.progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {client.progress}%
        </div>
      </div>
      {/* Form for changing weight */}
            <div className="d-flex justify-content-center mb-2">
            <form className="row g-3 mb-4 align-items-center"onSubmit={handleSubmit} >
                <div className="col-auto">
                <label  className="col-form-label">New Weight (kg):</label>
                </div>
                <div className="col-auto">
                <input type="number" className="form-control" id="newWeight" value={newWeight} onChange={handleInputChange} step={"0.1"} />
                </div>
                <div className="col-auto">
                <button type="submit"  className="btn btn-success ">Update Weight</button>
                </div>
            </form>
            </div>

      {/* DROPDOWN SECTION FOR CONTACT */}
      <div className="accordion mb-4" id="contactAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingContact">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseContact"
              aria-expanded="false"
              aria-controls="collapseContact"
            >
             Details
            </button>
          </h2>
          <div
            id="collapseContact"
            className="accordion-collapse collapse"
            aria-labelledby="headingContact"
            data-bs-parent="#contactAccordion"
          >
            <div className="accordion-body">
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Phone:</strong> {client.phoneNumber}</p>
              <p><strong>Address:</strong> {client.street}, {client.city}, {client.zipCode}, {client.country}</p>
              <hr />
                      <div><strong>Age:</strong> {client.age}</div>
                      <div><strong>Sex:</strong> {client.sex}</div>
                      <div><strong>Birth Date:</strong> {client.birthDate}</div>

            </div>
          </div>
        </div>
      </div>

      {/* OTHER INFO */}
      <div className="row row-cols-1 row-cols-md-2 g-3">
        <div><strong>Height:</strong> {client.height} cm</div>
        <div><strong>Original Weight:</strong> {client.originalWeight} kg</div>
        <div><strong>Current Weight:</strong> {client.currentWeight} kg</div>
        <div><strong>Goal Weight:</strong> {client.goalWeight} kg</div>
      </div>

    </div>
  </div>
  <hr />
  <div className="d-flex justify-content-between mb-1">
      <h5>Upcoming trainings</h5>
      <Link className="btn btn-success" to={`/trainings/all/${client.userId}/${clientId}`} >All trainings</Link>
  </div>
  
  <TrainingListSmall trainings={trainings} onDoneClick={handleDoneButton} onTrainingClick={handleClickTraining}/>
  <hr />
  <div className="d-flex justify-content-between">
  <h5 className="mb-3">📈 Weight History</h5>
  </div>
<div className="mb-1">
        <button
        className="btn btn-success"
        onClick={() => setShowChart(prev => !prev)}
      >
              {showChart ? "📋 Show List" : "📈 Show Chart"}
            </button>
          </div>

          {showChart ? (
            <WeightChart records={weightData} />
          ) : (
            <WeightList weightRecords={client.weightResponses} onDelete={handleDeleteWeightRecord} />
          )}
          <hr />

      <TrainingPlanList plans={plans} userId={client.userId} />
</div>
    );
}

export default ClientPage;