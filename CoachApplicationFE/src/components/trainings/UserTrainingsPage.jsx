import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getAllTrainingsForUser } from "../../api/training";
import TrainingTable from "./TrainingTable";

function UserTrainingsPage () {
    const {userId} = useParams();
    const [trainings, setTrainings] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        const fetchTrainings = async () => {
            try {
                const data = await getAllTrainingsForUser(userId)
                setTrainings(data);
                
            } catch (error) {
                console.error("Error getting trainings");
                
            }
            
        }
        fetchTrainings();
    },[userId])


    const handleBackButton = () =>{
        navigate(-1);
    }

    if(!trainings){
        return (<p>Loading...</p>)
    }

    return(
        <>

        <div className="container my-3">
            <h6>Calendar in progress</h6>
            <button className="btn btn-success" onClick={handleBackButton} >↩️</button>
            <TrainingTable trainings={trainings} userId={userId} />
        </div>

        </>
    )
}


export default UserTrainingsPage;