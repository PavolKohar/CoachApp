import axios from "axios";

const BASE_URL = "http://localhost:8080/clients";


export const addClient = async (clientData) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-new`, clientData);
        return response.data;
    } catch (error) {
        console.error("Error adding client:", error);
        throw error;
    }
};


