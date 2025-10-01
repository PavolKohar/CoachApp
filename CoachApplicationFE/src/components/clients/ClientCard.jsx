import { Link } from "react-router-dom";

function ClientCard ({client}){
    return(
            <div className="card bg-dark text-white mb-3 shadow" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
        <h5 className={`card-title ${client.active ? 'text-success' : 'text-danger'}`}>
            {client.firstName} {client.lastName}
        </h5>
        <h5>{client.currentWeight} kg </h5>
        </div>
        <p className="card-text">📧 {client.email}</p>
        <p className="card-text">📞 {client.phoneNumber}</p>
        
        <Link to={`/clients/${client.clientId}`} className="btn btn-outline-success">Details</Link>
      </div>
    </div>
    )
}

export default ClientCard;