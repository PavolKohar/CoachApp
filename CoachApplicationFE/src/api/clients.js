import axios from "axios";

const BASE_URL = "http://localhost:8080/clients";


export const addClient = async (clientData) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-new`, clientData,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding client:", error);
        throw error;
    }
};


export const getClientById = async (clientId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${clientId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching client:", error);
        throw error;
    }
};
export const getClientByIdSmall = async (clientId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${clientId}/small`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching client:", error);
        throw error;
    }
};


export const updateCurrentWeight = async (clientId, newWeight) => {
    try {
        const response = await axios.post(`${BASE_URL}/${clientId}/update-weight`, { newWeight },{   
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log("Updated client data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating weight:", error);
        throw error;
    }
};

export const toggleActive = async (clientId) => {
    try{
        const response = await axios.post(`${BASE_URL}/${clientId}/toggle-active`,{},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    }catch(error){
        console.error("Error toggle active",error);
        throw error;
    }
}

export const addNoteToClient = async (userId ,clientId, noteData) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-note/${userId}/${clientId}`, noteData,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding note to client:", error);
        throw error;
    }
};


export const getClientNotes = async (clientId) => {
    try {
        const response = await axios.get(`${BASE_URL}/all-notes/${clientId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching client notes:", error);
        throw error;
    }
};

export const deleteWeightRecord = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/remove-weight-record/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
    } catch (error) {
        console.error("Error deleting record:" , error)
        throw error; 
    }
}


