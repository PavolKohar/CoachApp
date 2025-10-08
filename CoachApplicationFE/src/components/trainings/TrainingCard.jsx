

function TrainingCard({ training}) {


  return (
<div className="container my-4">
  <div
    className="card bg-light text-dark shadow-sm border-0"
    style={{ maxWidth: "100%", minWidth: "300px", borderRadius: "10px" }}
  >
    <div className="card-body">
      {/* Názov tréningu a dátum */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="card-title mb-0">{training.title}</h3>
        <span className="badge bg-secondary">{training.date}</span>
      </div>

      <hr />

      {/* Description */}
      {training.description && (
        <div className="mb-3">
          <small className="text-muted">Description:</small>
          <p className="mb-0">{training.description}</p>
        </div>
      )}

      {/* Klient a nastavenie */}
      <div className="mb-3">
        <small className="text-muted">Client:</small><br />
        <strong>{training.clientFullName || "—"}</strong>
      </div>

      <div className="mb-3">
        <small className="text-muted">Settings:</small><br />
        <span>
          <strong>{training.settingsName || "—"}</strong>{" "}
          <span className="badge bg-success">{training.price || "-"} €</span>
        </span>
      </div>

      {/* Trvanie a čas */}
      <div className="d-flex justify-content-between mt-3">
        <div>
          <small className="text-muted">Time:</small><br />
          <strong>{training.time?.slice(0, 5)} – {training.endTime?.slice(0, 5)}</strong>
        </div>
        <div>
          <small className="text-muted">Duration:</small><br />
          <strong>{training.durationInMinutes || "—"} min</strong>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default TrainingCard;