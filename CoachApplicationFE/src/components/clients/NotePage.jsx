import NoteList from "../NoteList";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getClientNotes } from "../../api/clients";
import NotePreview from "../NotePreview";
import { getClientByIdSmall } from "../../api/clients";
import { Link } from "react-router-dom";


function NotePage() {
    const { userId, clientId } = useParams();
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [client, setClient] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                   const data = await getClientNotes(clientId);
                   const clientData = await getClientByIdSmall(clientId);
                   setClient(clientData);
                   setNotes(data);
                   console.log("Client data:", clientData);
                    console.log("Client notes data:", data);
                
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, [userId, clientId]);

    const handleDeleteNote = (idToDelete) =>{
        const updatedNotes = notes.filter(n=> n.id !== idToDelete);
        console.log(updatedNotes)
        setNotes(updatedNotes)
    }

  if (!client || !notes) {
    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}


    return (
        <>
            <div className="container mt-5 row gap-4 mx-auto">
            <h2 className="text-center">
                 Notes for {client ? client.firstName + " " + client.lastName + " " + userId : "Client"}
            </h2>
                <Link to={`/clients/add-note/${client.userId}/${client.clientId}`}className="btn btn-outline-success"> Add note 📝</Link>

            <hr />
            <div className="col-4">
                <NoteList notes={notes} onNoteClick={setSelectedNote} onDelete={handleDeleteNote} />
            </div>
            <div className="col-7 ms-5">
                <NotePreview note={selectedNote} />
            </div>
            </div>
       
        </>
        

    );  
}
export default NotePage;