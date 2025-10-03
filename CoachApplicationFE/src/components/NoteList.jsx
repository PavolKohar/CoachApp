import NoteCard from "./NoteCard";
import { Link } from "react-router-dom";

function NoteList({ notes , onNoteClick})  {
    return (
        <div className="d-flex flex-column align-items-center">
  <div className="card shadow mb-4" style={{ width: "100%", maxWidth: "300px" ,maxHeight: "500px" }}>
    <div className="card-header bg-success text-white">
      <h5 className="mb-0">All notes</h5>
    </div>
    <div className="card-body" style={{ maxHeight: "500px", overflowY: "auto" }}>
      {notes.length === 0 ? (
        <p className="text-center">No notes available.</p>
        

      ) : (
        notes.map((note) => <NoteCard key={note.id} note={note} onClick={()=> onNoteClick(note)} />)
      )}
    </div>
  </div>
</div>
    );
}

export default NoteList;