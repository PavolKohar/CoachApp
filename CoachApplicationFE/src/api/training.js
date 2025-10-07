import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/trainings';


export const addNewTraining = async (userId, trainingData) => {
    try {
        const response = await axios.post(`${BASE_URL}/${userId}/add` , trainingData , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
        
    } catch (error) {
        console.error("Error creating training : " , error)
        throw error;
    }
    
}


export const addNewTrainingPlan = async (userId, planData) => {
    try {
        const response = await axios.post(`${BASE_URL}/${userId}/add-plan`, planData , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
        
    } catch (error) {
        console.error("Error creating plan: , ", error)
        throw error; 
        
    }
    
}