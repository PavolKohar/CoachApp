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


