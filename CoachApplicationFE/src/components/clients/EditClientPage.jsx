import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClientById } from "../../api/clients";
import EditFitnessForm from "./EditFitnessForm";
import EditAddressForm from "./EditAddressForm";
import EditContactForm from "./EditContactForm";
import { useNavigate } from "react-router-dom";
import { deleteClientById } from "../../api/clients";

function EditClientPage() {
  const { userId, clientId } = useParams();
  const [client, setClient] = useState(null);
  const navigate = useNavigate();

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

  const handleDeleteClient = async () =>{
    if(window.confirm("Are you sure to delete this client ?"))
    try{
        await deleteClientById(clientId);
    }catch(error){
      console.error("Error deleting client, ", error);
      alert("Error deleting client")
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <button onClick={()=>navigate(-1)} className="btn btn-success">↩️</button>
        <h1 className="text-center flex-grow-1">Edit Client</h1>
        <div className="dropdown">
          <button
            className="btn btn-success dropdown-toggle"
            type="button"
            id="dropdownMenuDark"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            ⚙️
          </button>
          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
            <li><a className="dropdown-item" href="#">Statistic</a></li>
            <li><a className="dropdown-item" href="#">Create training plan</a></li>
            <li><a className="dropdown-item" href="#">Deactivate</a></li>
            <button
                  className="dropdown-item"
                  onClick={handleDeleteClient}
            >
                        Remove Client
            </button>
          </ul>
        </div>
      </div>

      <hr />

      {!client ? (
        <p>Loading client...</p>
      ) : (
        <>
          {/* Tabs Navigation */}
          <nav className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-fitness-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-fitness"
              type="button"
              role="tab"
              aria-controls="nav-fitness"
              aria-selected="true"
            >
              Fitness
            </button>
            <button
              className="nav-link"
              id="nav-address-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-address"
              type="button"
              role="tab"
              aria-controls="nav-address"
              aria-selected="false"
            >
              Address
            </button>
            <button
              className="nav-link"
              id="nav-contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-contact"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
            >
              Contact
            </button>
          </nav>

          {/* Tabs Content */}
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-fitness"
              role="tabpanel"
              aria-labelledby="nav-fitness-tab"
            >
              <EditFitnessForm client={client} userId={userId} />
            </div>

            <div
              className="tab-pane fade"
              id="nav-address"
              role="tabpanel"
              aria-labelledby="nav-address-tab"
            >
              <EditAddressForm client={client} userId={userId} />
            </div>

            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <EditContactForm client={client} userId={userId} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EditClientPage;