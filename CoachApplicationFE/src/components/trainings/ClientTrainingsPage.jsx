import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getClientTrainings } from "../../api/training";
import TrainingTable from "./TrainingTable";


function ClientTrainingsPage (){
    const {userId, clientId} = useParams();
    const [trainings, setTrainings] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        const fetchTrainings = async () => {
            try {
                const data = await getClientTrainings(clientId);
                setTrainings(data);
            } catch (error) {
                console.error("Error fetching trainings " ,error)
                
            }
        }
        fetchTrainings();
    },[clientId])

    const handleBackButton = () =>{
        navigate(-1)
    }

    if(!trainings){
        return (<p>Loading...</p>)
    }


    return(<>

        <div className="container my-3">
            <button className="btn btn-success" onClick={handleBackButton} >↩️</button>
            <TrainingTable trainings={trainings} userId={userId} />
        </div>

    
    
    
    
    
    
    
    
    
        </>)
}


export default ClientTrainingsPage;