import TrainingCardSmall from "./TrainingCardSmall";
import { Link } from "react-router-dom";

function TrainingListSmall ({trainings, onTrainingClick , onDoneClick}){
  return (
    <div className="my-0">

      <div
        className="d-flex flex-row gap-3 overflow-auto"
        style={{
          whiteSpace: "nowrap",
          paddingBottom: "1rem",
          scrollSnapType: "x mandatory"
        }}
      >
        {trainings.length === 0 ? (
          <div className="text-muted">No records available.</div>
        ) : (
          trainings
            .slice()
            .reverse()
            .map((rec) => (
              <div key={rec.id} style={{ scrollSnapAlign: "start" }}>
                <TrainingCardSmall training={rec} onDoneClick={onDoneClick} onClick={()=> onTrainingClick(rec.id)} />
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default TrainingListSmall;