

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