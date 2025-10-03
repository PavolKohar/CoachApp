import { deleteNote } from "../api/clients";

function NoteCard({ note , onClick, onDelete }) {
    
    const handleDelete = async () =>{
        if(window.confirm("Are you sure to delete this note ?")){
            try{
                await deleteNote(note.id);
                onDelete(note.id);

            }catch(error){
                console.error("Error deleting note: " ,error)
            }
        }
    }


    return (
        <>
            {note && note.note && (
            <div
                className="card bg-light text-dark mb-3 shadow"
                style={{ maxWidth: "300px", maxHeight: "100px", cursor: "pointer" }}
                onClick={onClick}
            >
                <div className="card-body">
                   <div className="d-flex justify-content-between">
                                    <p className="card-text">
                    {note.note.length > 30
                    ? `${note.note.slice(0, 30)}...`
                    : note.note}
                </p>
                <button type="button" onClick={(e)=>{
                    e.stopPropagation();
                    handleDelete()
                }} className="btn btn-sm btn-danger">🗑️</button>

                   </div>

                
                <p className="card-text">
                    <small className="text-muted">
                    Added on: {new Date(note.date).toLocaleDateString()}
                    </small>
                </p>
                </div>
            </div>
)}
        
        
        
        
        
        
        
        </>

    );
}

export default NoteCard;