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


export const getTodayTrainingsforUser = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}/today`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error getting today trainings: ", error)
        throw error;
    }
    
}

export const getThisWeekTrainingsForUser = async (userId) => {
    try {
                const response = await axios.get(`${BASE_URL}/${userId}/this-week`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data;   
    } catch (error) {
        console.error("Error get this week trainings " , error)
        throw error;
    }
    
}

export const getNextWeekTrainingsForUser = async (userId) =>{
    try {
   const response = await axios.get(`${BASE_URL}/${userId}/next-week`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data; 
    } catch (error) {
        console.error("Error getting next-week trainings ", error)
        throw error;
        
    }
}