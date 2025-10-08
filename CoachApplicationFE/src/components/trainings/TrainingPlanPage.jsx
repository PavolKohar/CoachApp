import { useParams } from "react-router-dom";
import TrainingPlanCardFull from "./TrainingPlanCardFull";
import TrainingTable from "./TrainingTable";
import { useState } from "react";
import { getTrainingPlanbyId } from "../../api/training";
import { getTrainingsByTrainingPlan } from "../../api/training";
import { useEffect } from "react";

function TrainingPlanPage (){

const {planId,userId} = useParams();
const [trainings,setTrainings] = useState([]);
const [plan,setPlan] = useState();

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

if (!plan) return <p>Loading...</p>;

return(<>

    <div className="container mt-5">

    

    <TrainingPlanCardFull plan={plan} />
    <hr />
    <TrainingTable trainings={trainings} userId={userId} />

    </div>
    </>)






}

export default TrainingPlanPage;