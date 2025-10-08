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

export const getTrainingById = async (trainingId) =>{
    try {
        const response = await axios.get(`${BASE_URL}/${trainingId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data; 
    } catch (error) {
        console.error("Error getting training")
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

export const toggleTrainingDone = async (trainingId) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${trainingId}/done`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to mark training as done", error);
    throw error;
  }
};


export const updateTraining = async (id,data) => {
    try{
        await axios.patch(`${BASE_URL}/update/${id}`,data,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
    }catch(error){
        console.error("Error editing training", error)
        throw error;
    }
    
}

export const deleteTraining = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/delete/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
    } catch (error) {
        console.error("Error deleting training " ,error)
        throw error;
    }
    
}