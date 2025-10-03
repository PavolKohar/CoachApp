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
        
        <div className="d-flex justify-content-between">
        <Link to={`/clients/${client.clientId}`} className="btn btn-outline-success">Details</Link>
        <div className="">
        <Link to={`/clients/add-note/${client.userId}/${client.clientId}`}className="btn btn-outline-success">📝</Link>
        <Link to={`/all-notes/${client.userId}/${client.clientId}`} className="btn btn-outline-success">All notes</Link>
        </div>
        </div>
      </div>
    </div>
    )
}

export default ClientCard;