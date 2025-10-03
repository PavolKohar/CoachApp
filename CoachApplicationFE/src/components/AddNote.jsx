import { addNoteToUser } from "../api/users";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addNoteToClient } from "../api/clients";



function AddNote() {
    const { userId, clientId } = useParams();
    const [noteContent, setNoteContent] = useState("");
    const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const noteData = { note: noteContent, clientId: clientId };

        if (clientId) {
            // poznámka pre klienta
            const response = await addNoteToClient(userId, clientId, noteData);
            console.log("Note added successfully to client:", response);
            console.log("Test 1");
        } else {
            // poznámka čisto pre usera
            const response = await addNoteToUser(userId, noteData);
            console.log("Note added successfully to user:", response);
            console.log("Test 2");
        }

        setNoteContent("");
        navigate(-1); // späť na predchádzajúcu stránku
    } catch (error) {
        console.error("Error adding note:", error);
    }
};


  return (<>

        <div className="container mt-5">
        <div
            className="card shadow-lg border-0"
            style={{ maxWidth: "600px", margin: "0 auto", borderRadius: "15px" }}
        >
            <div className="card-body p-4">
            <h4 className="card-title text-success mb-4 text-center">📝 Add Note</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="noteContent" className="form-label fw-semibold">
                    Note
                </label>
                <textarea
                    className="form-control"
                    id="noteContent"
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    rows="5"
                    required
                    placeholder="Write something about the client..."
                    style={{ borderRadius: "10px", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)" }}
                ></textarea>
                </div>
                <div className="text-end">
                <button
                    type="submit"
                    className="btn btn-success px-4 py-2 fw-semibold"
                    style={{ borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 128, 0, 0.2)" }}
                >
                    ➕ Add Note
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
  
  
  
  
  
  
  
  
  
  
        </>);
}

export default AddNote;