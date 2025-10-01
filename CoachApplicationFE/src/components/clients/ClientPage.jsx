import { getClientById } from "../../api/clients";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ClientPage(){
    const { clientId } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const data = await getClientById(clientId);
                setClient(data);
                console.log("Fetched client data:", data);
            } catch (error) {
                console.error("Error fetching client data:", error);
            }
        };

        fetchClient();
    }, [clientId]);

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

  <div className="card shadow">
    <div className="card-body">

      {/* PROGRESS BAR */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-3">Progress</h5>
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
            <div className="d-flex justify-content-center">
            <form className="row g-3 mb-4 align-items-center">
                <div className="col-auto">
                <label htmlFor="newWeight" className="col-form-label">New Weight (kg):</label>
                </div>
                <div className="col-auto">
                <input type="number" className="form-control" id="newWeight" value={client.currentWeight} placeholder="e.g., 75" />
                </div>
                <div className="col-auto">
                <button type="submit" className="btn btn-success mb-3">Update Weight</button>
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