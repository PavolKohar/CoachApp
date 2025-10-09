import { useParams } from "react-router-dom";
import TrainingPlanCardFull from "./TrainingPlanCardFull";
import TrainingTable from "./TrainingTable";
import { useState } from "react";
import { getTrainingPlanbyId } from "../../api/training";
import { getTrainingsByTrainingPlan } from "../../api/training";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTrainingPlanById } from "../../api/training";

function TrainingPlanPage (){

const {planId,userId} = useParams();
const [trainings,setTrainings] = useState([]);
const [plan,setPlan] = useState();
const navigate = useNavigate();

useEffect(()=>{
    const fetchObjects = async () => {
        try{
        const planData = await getTrainingPlanbyId(planId);
        const trainingsData = await getTrainingsByTrainingPlan(planId);
        setPlan(planData)
        setTrainings(trainingsData);
        }catch(error){
            console.error("Error fetching data ", error);
        }    
    }
    fetchObjects();
},[planId])

const handleBackButton = () =>{
    navigate(-1);
}

const handleDeleteButton = () =>{
    if(window.confirm("Are you sure to delete this plan ? All trainings will be removed "))
        try {
            deleteTrainingPlanById(planId);
            navigate(-1);

        } catch (error) {
            console.error("Error deleting plan")
            alert("Error deleting plan")
        }
}


if (!plan) return <p>Loading...</p>;

return(<>

    <div className="container mt-5">
        <div className="d-flex justify-content-between mb-2">
            <button className="btn btn-success" onClick={handleBackButton} >↩️</button>
            <button className="btn btn-danger" onClick={handleDeleteButton} >Remove</button>
        </div>

    

    <TrainingPlanCardFull plan={plan} />
    <hr />
    <TrainingTable trainings={trainings} userId={userId} />

    </div>
    </>)






}

export default TrainingPlanPage;