import { markTrainingAsDone } from "../../api/training";

function TrainingCard({ training, onDone }) {

      const handleDoneClick = async () => {
    try {
      await markTrainingAsDone(training.id);
      onDone(training.id); // Aktualizácia v rodičovi
    } catch (error) {
      alert("Failed to mark as done");
    }
  };

  return (
<div
  className="card bg-light text-dark mb-3 shadow-sm border-0"
  style={{ maxWidth: "100%", minWidth: "280px" }}
>
  <div className="card-body">
    {/* Názov tréningu a dátum */}
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h5 className="card-title mb-0">{training.title}</h5>
      <span className={`badge ${training.done ? 'bg-success' : 'bg-warning text-dark'}`}>
        {training.date}
      </span>
    </div>

    {/* Klient a nastavenie */}
    <div className="mb-2">
      <small className="text-muted">Client:</small><br />
      <span>{training.clientFullName || "—"}</span>
    </div>
    <div className="mb-2">
      <small className="text-muted">Settings:</small><br />
      <span>{training.settingsName || "—"}</span>
    </div>

    {/* Trvanie a čas */}
    <div className="d-flex justify-content-between mt-3">
      <div>
        <small className="text-muted">Time:</small><br />
        <strong>{training.time} - {training.endTime}</strong>
      </div>
      <div>
        <small className="text-muted">Duration:</small><br />
        <strong>{training.durationInMinutes || "—"} min</strong>
      </div>
    </div>


    {/* Akcie */}
    <div className="mt-4 d-flex justify-content-between">
      <button
        className={`btn btn-sm ${training.done ? 'btn-outline-danger' : 'btn-outline-success'}`}
        onClick={handleDoneClick}
      >
        {training.done ? "Undo Done" : "Mark Done"}
      </button>

      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => {
          // TODO: napríklad navigate(`/trainings/edit/${training.id}`)
          console.log("Reschedule clicked");
        }}
      >
        Reschedule
      </button>
    </div>
  </div>
</div>
  );
}

export default TrainingCard;