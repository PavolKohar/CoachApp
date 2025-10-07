

import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api/users';

export const addNoteToUser = async (userId, noteData) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-note/${userId}`, noteData,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding note to user:", error);
        throw error;
    }
};

export const getUserNotes = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/all-notes/${userId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user notes:", error);
        throw error;
    }
};

export const getUserPrograms = async (userId) => {
    try{
        const response = await axios.get(`${BASE_URL}/programs/${userId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
    });
    return response.data
    }catch (error){
        console.error("Error fetching program data:", error)
        throw error;
    }
};


export const addTrainingSettingsToUser = async (userId,data) =>{
    try {
        const response = await axios.post(`${BASE_URL}/training-settings/${userId}/add`, data ,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
        
    } catch (error) {
        console.error("Error adding settings: " , error)
        throw error;
        
    }
}

export const getClientsForUser = async (userId) => {
    try{
        const response = await axios.get(`${BASE_URL}/${userId}/all-clients`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data;
    }catch(error){
        console.error("Error getting clients", error)
        throw error;
    }
    
}


export const getAllTrainingSettingsForUser = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/training-settings/${userId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        console.error("Error fetching settings data")
        throw error;
    }
    
}