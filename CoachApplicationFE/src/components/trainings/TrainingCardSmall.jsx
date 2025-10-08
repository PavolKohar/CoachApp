import { toggleTrainingDone } from "../../api/training";

function TrainingCardSmall ({training, onClick , onDoneClick}){

    const handleDoneClick = async () => {
        try{
            await toggleTrainingDone(training.id);
            onDoneClick(training.id);
        }catch(error){
            console.error("Error toggle training", error)
        }   
    }

    return(
        <>
    <div
      className="card shadow-sm mb-3"
      style={{ width: "300px", fontSize: "0.9rem", borderRadius: "10px",cursor: "pointer" }}
      onClick={onClick}
    >
      <div className="card-body p-3">
        <div className="d-flex justify-content-between">
        <h6 className="card-title text-muted mb-2">
          {new Date(training.date).toLocaleDateString()} {" "}
            {training.done && (
            <span className="badge bg-success">
                Done
            </span>
            )}
          
        </h6>
        <h6>{training.title}</h6>
        </div>
        <p className="mb-1">
          <small className="text-muted">Time:</small>{" "}
          <span>{training.time} - {training.endTime} </span>
        </p>
        <div className="d-flex justify-content-between">
        <p className="mb-0">
          <small className="text-muted">Client</small>{" "}
          <strong>{training.clientFullName}</strong>
        </p>
            <button
            className={`btn btn-sm ${training.done ? "btn-danger" : "btn-success"}`}
            onClick={(e) => {
                e.stopPropagation();
                handleDoneClick();
            }}
            >
            {training.done ? "✖️" : "✔️"}
            </button>
        </div>
      </div>
    </div>
        </>
    )
}

export default TrainingCardSmall;