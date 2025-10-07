import { useEffect, useState } from "react";
import TrainingCard from "./TrainingCard";

function TrainingList({ trainings, header }) {
  const [localTrainings, setLocalTrainings] = useState([]);

  useEffect(() => {
    setLocalTrainings(trainings || []);
  }, [trainings]);

  const handleMarkDone = (id) => {
    setLocalTrainings(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  };

  return (
    <div className="my-4">
      <h5>{header}</h5>
      <div className="d-flex gap-3 overflow-auto">
        {localTrainings.length === 0 ? (
          <div className="text-muted">No trainings found.</div>
        ) : (
          localTrainings.map(t => (
            <TrainingCard key={t.id} training={t} onDone={handleMarkDone} />
          ))
        )}
      </div>
    </div>
  );
}

export default TrainingList;