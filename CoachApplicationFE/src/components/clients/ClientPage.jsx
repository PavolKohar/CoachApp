import { getClientById } from "../../api/clients";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateCurrentWeight } from "../../api/clients";

function ClientPage(){
    const { clientId } = useParams();
    const [client, setClient] = useState(null);
    const [newWeight, setNewWeight] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        const fetchClient = async () => {
            try {
                const data = await getClientById(clientId);
                setClient(data);
                if(data && data.currentWeight !== undefined){
                    setNewWeight(data.currentWeight);
                    console.log("Initial weight set to:", data.currentWeight);
                }
                console.log("Fetched client data:", data);
            } catch (error) {
                console.error("Error fetching client data:", error);
            }
        };

        fetchClient();
    }, [clientId]);

    

    const handleInputChange = (e) => {
        const { value } = e.target;
        setNewWeight(value);    
    };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await updateCurrentWeight(clientId, newWeight); // váha sa aktualizuje na backende
    const updatedClient = await getClientById(clientId); // získa sa aktualizovaný klient
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

    if (!client) {
        return <div>Loading...</div>;
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
        <h5 className="mb-0">Progress</h5>
        <div><strong>Activity Level:</strong> {client.activityLevel}</div>
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
</div>
    );
}

export default ClientPage;