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
            <h2 className="text-center text-success mb-4">Client Details</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{client.firstName} {client.lastName}</h5>
                    <p className="card-text"><strong>Email:</strong> {client.email}</p>
                    <p className="card-text"><strong>Phone Number:</strong> {client.phoneNumber}</p>
                    <p className="card-text"><strong>Address:</strong> {client.street}, {client.city}, {client.zipCode}, {client.country}</p>
                    <p className="card-text"><strong>Birth Date:</strong> {client.birthDate}</p>
                    <p className="card-text"><strong>Sex:</strong> {client.sex}</p> 
                    <p className="card-text"><strong>Height:</strong> {client.height} cm</p>
                    <p className="card-text"><strong>Activity Level:</strong> {client.activityLevel}</p>
                    <p className="card-text"><strong>Original Weight:</strong> {client.originalWeight} kg</p>
                    <p className="card-text"><strong>Current Weight:</strong> {client.currentWeight} kg</p>
                    <p className="card-text"><strong>Goal Weight:</strong> {client.goalWeight} kg</p>
                </div>
            </div>
        </div>
    );
}

export default ClientPage;