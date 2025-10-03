function NotePreview({ note }) {
  if (!note) {
    return (
      <div className="card text-center p-4 shadow">
        <p className="text-muted">No note selected</p>
      </div>
    );
  }

  return (
<div className="card bg-light text-dark mb-3 shadow" style={{ maxWidth: "600px", height: "500px" }}>
  <div className="card-body d-flex flex-column">
    
    <p className="card-text">{note.note}</p>

    <div className="mt-auto d-flex justify-content-between align-items-center">
      <small className="text-muted">Added on: {new Date(note.date).toLocaleDateString()}</small>
      <button className="btn btn-sm btn-success">Edit</button>
    </div>

  </div>
</div>
  );
}
export default NotePreview;