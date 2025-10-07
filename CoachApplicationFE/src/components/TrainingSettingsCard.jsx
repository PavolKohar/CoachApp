
function TrainingSettingsCard({ data }) {
  if (!data) return null;

  return (
    <div
      className="card bg-light text-dark mb-3 shadow-sm border-0"
      style={{ maxWidth: "100%", minWidth: "250px" }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{data.name}</h5>
          <span className="badge bg-success">{data.price} €</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className="text-muted">Duration:</small>
          <span className="text-dark">{data.durationInMinutes} min</span>
        </div>
      </div>
    </div>
  );
}

export default TrainingSettingsCard;