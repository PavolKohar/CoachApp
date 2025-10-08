import React, { use } from "react";
import { useNavigate } from "react-router-dom";

function TrainingPlanCard({ plan , userId }) {
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
  const navigate = useNavigate();

  const progressPercent = totalWorkouts
    ? Math.round((doneWorkouts / totalWorkouts) * 100)
    : 0;

  return (
    <div
      className="card bg-light text-dark shadow-sm mb-3 border-0"
      style={{ minWidth: "280px", maxWidth: "100%" ,cursor: "pointer"}}
      onClick={()=>navigate(`/plan/${userId}/${id}`)}
    >
      <div className="card-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{title}</h5>
          <span
            className={`badge ${done ? "bg-success" : "bg-warning text-dark"}`}
          >
            {done ? "Done ✅" : "In Progress ⏳"}
          </span>
        </div>

        {/* Klient */}
        <div className="mb-2">
          <small className="text-muted">Client:</small><br />
          <strong>{clientFullName || "—"}</strong>
        </div>

        {/* Termín */}
        <div className="mb-2">
          <small className="text-muted">Duration:</small><br />
          {startDate} – {endDate}
        </div>

        {/* Počet tréningov */}
        <div className="mb-2">
          <small className="text-muted">Workouts:</small><br />
          {doneWorkouts} / {totalWorkouts} completed
        </div>

        {/* Progress bar */}
        <div className="progress" style={{ height: "6px" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${progressPercent}%` }}
            aria-valuenow={progressPercent}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default TrainingPlanCard;