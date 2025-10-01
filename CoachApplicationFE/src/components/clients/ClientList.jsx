import ClientCard from "./ClientCard"; 
import { useEffect, useState } from "react";

function ClientList({clients}){
      return (
    <div className="container mt-4">
      <h2 className="text-center text-success mb-4">Your Clients</h2>
      <div className="row justify-content-center">
        {clients.map(client => (
          <div className="col-md-4" key={client.clientId}>
            <ClientCard client={client} />
          </div>
        ))}
      </div>
    </div>
  );

}


export default ClientList;