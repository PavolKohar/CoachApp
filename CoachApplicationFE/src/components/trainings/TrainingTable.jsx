import React from "react";
import { useNavigate } from "react-router-dom";

function TrainingTable({ trainings, userId }) {
  const navigate = useNavigate();

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Client</th>
            <th scope="col">Title</th>
            <th scope="col">Duration</th>
            <th scope="col">Price</th>
            <th scope="col">Settings</th>
            <th scope="col">Done</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
{
  trainings
    .slice()
    .sort((a, b) => {
      // 1. Najprv podľa `done` (false < true = nedokončené hore)
      if (a.done !== b.done) return a.done - b.done;

      // 2. Potom podľa dátumu
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    })
    .map((t) => (
      <tr
        key={t.id}
        onClick={() => navigate(`/training/${userId}/${t.id}`)}
        style={{ cursor: "pointer" }}
      >
        <td>{t.date}</td>
        <td>{t.time?.slice(0, 5)} – {t.endTime?.slice(0, 5)}</td>
        <td>{t.clientFullName || "—"}</td>
        <td>{t.title}</td>
        <td>{t.durationInMinutes} min</td>
        <td>{t.price} €</td>
        <td>{t.settingsName || "—"}</td>
        <td>
          {t.done ? (
            <span className="badge bg-success">✔️</span>
          ) : (
            <span className="badge bg-warning text-dark">⏳</span>
          )}
        </td>
        <td>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/training/${userId}/${t.id}`);
            }}
          >
            ✏️
          </button>
        </td>
      </tr>
    ))
}
          
        </tbody>
      </table>
    </div>
  );
}

export default TrainingTable;