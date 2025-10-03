function NoteCard({ note , onClick }) {


    return (
        <>
            {note && note.note && (
            <div
                className="card bg-light text-dark mb-3 shadow"
                style={{ maxWidth: "300px", maxHeight: "100px", cursor: "pointer" }}
                onClick={onClick}
            >
                <div className="card-body">
                <p className="card-text">
                    {note.note.length > 30
                    ? `${note.note.slice(0, 30)}...`
                    : note.note}
                </p>
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