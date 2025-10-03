
function WeightRecord({ oneRecord }) {
  return (
    <div
      className="card shadow-sm mb-3"
      style={{ width: "300px", fontSize: "0.9rem", borderRadius: "10px" }}
    >
      <div className="card-body p-3">
        <h6 className="card-title text-muted mb-2">
          {new Date(oneRecord.date).toLocaleDateString()} :{" "}
          <span
          className="text-dark"
          >
            {oneRecord.difference > 0 ? "+" : ""}
            {oneRecord.difference} kg
          </span>
        </h6>
        <p className="mb-1">
          <small className="text-muted">Old weight:</small>{" "}
          <span>{oneRecord.oldWeight} kg</span>
        </p>
        <p className="mb-0">
          <small className="text-muted">New weight:</small>{" "}
          <strong>{oneRecord.newWeight} kg</strong>
        </p>
      </div>
    </div>
  );
}

export default WeightRecord;