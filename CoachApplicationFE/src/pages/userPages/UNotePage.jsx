import NoteList from "../../components/NoteList";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getUserNotes } from "../../api/users";
import { getUserById } from "../../api/auth";

import NotePreview from "../../components/NotePreview";

function UNotePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [selectedClient, setSelectedClient] = useState("all");

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await getUserNotes(userId);
                const userData = await getUserById(userId, localStorage.getItem("token"));
                console.log("User notes data:", data);
                console.log("User data:", userData);
                setUser(userData);
                setNotes(data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, [userId]);

    const uniqueClients = notes
        .filter((note)=> note.clientId !== null && note.clientId !== undefined)
        .map((note) => note.clientId)
        .filter((value, index, self) => self.indexOf(value) === index);

        const filteredNotes = selectedClient === "all"
        ? notes
        : notes.filter((note) => note.clientId === parseInt(selectedClient));

    if (!notes) {
        return <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
    }

    return (
                <>
            <div className="container mt-5 row gap-4 mx-auto">
                <h2 className="text-center mb-4">🗒️ Your Notes</h2>

      {/* Select Filter */}
                <div className="text-center">
                    <label className="me-2 fw-semibold">Filter by client:</label>
                 <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="form-select w-auto d-inline"
                    >
                    <option value="all">All notes</option>
                    {user?.clients?.map((client) => (
                        <option key={client.clientId} value={client.clientId}>
                        {client.firstName} {client.lastName}
                        </option>
                    ))}
                </select>
                </div>
            <div className="col-4">
                <NoteList notes={filteredNotes} onNoteClick={setSelectedNote} />
            </div>
            <div className="col-7 ms-5">
                <NotePreview note={selectedNote} />
            </div>
            </div>
       
        </>
    );  
}
export default UNotePage;