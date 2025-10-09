
import { useNavigate } from "react-router-dom";

function TrainingPlanCardFull({ plan }) {
  const navigate = useNavigate();

  const {
    id,
    title,
    startDate,
    endDate,
    totalWorkouts,
    doneWorkouts,
    clientFullName,
    done
  } = plan;

  const progressPercent = totalWorkouts
    ? Math.round((doneWorkouts / totalWorkouts) * 100)
    : 0;

  return (
    <div
      className="card bg-white text-dark shadow mb-4 border-0"
      style={{
        borderRadius: "15px",
      }}
     
    >
      <div className="card-body p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h4 className="mb-1">{title}</h4>
            <p className="text-muted mb-0">Client: <strong>{clientFullName || "—"}</strong></p>
          </div>
          <span
            className={`badge fs-6 px-3 py-2 ${done ? "bg-success" : "bg-warning text-dark"}`}
          >
            {done ? "✅ Done" : "⏳ In Progress"}
          </span>
        </div>

        <hr />

        {/* Dates */}
        <div className="row mb-3">
          <div className="col-sm-6">
            <small className="text-muted">Start Date</small><br />
            <strong>{startDate}</strong>
          </div>
          <div className="col-sm-6">
            <small className="text-muted">End Date</small><br />
            <strong>{endDate}</strong>
          </div>
        </div>

        {/* Workouts */}
        <div className="mb-3">
          <small className="text-muted">Workouts Completed</small><br />
          <strong>{doneWorkouts} / {totalWorkouts}</strong>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="progress" style={{ height: "10px", borderRadius: "5px" }}>
            <div
              className={`progress-bar ${done ? "bg-success" : "bg-info"}`}
              role="progressbar"
              style={{ width: `${progressPercent}%` }}
              aria-valuenow={progressPercent}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <div className="text-end small text-muted mt-1">
            {progressPercent}% completed
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingPlanCardFull;