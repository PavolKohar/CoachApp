import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

export const loginUserAPI = async (credentials) => {
   try{
     const response = await axios.post(`${BASE_URL}/login`, credentials);
     return response.data;
   }catch(error){
     console.error("Error logging in:", error);
     throw error;
   }
   
};


export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};


export const getUserById = async (userId, token) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};