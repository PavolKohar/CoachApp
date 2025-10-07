import TrainingCard from "./TrainingCard";

function TrainingList({ trainings,header }) {
  return (
    <div className="my-4">
      <h5 className="mb-3">{header}</h5>

      <div
        className="d-flex flex-row gap-3 overflow-auto"
        style={{
          whiteSpace: "nowrap",
          paddingBottom: "1rem",
          scrollSnapType: "x mandatory"
        }}
      >
        {trainings.length === 0 ? (
          <div className="text-muted">No trainings available.</div>
        ) : (
          trainings
            .slice()
            .sort((a, b) => new Date(a.date) - new Date(b.date)) // zoradí podľa dátumu
            .map((training) => (
              <div key={training.id} style={{ scrollSnapAlign: "start" }}>
                <TrainingCard training={training} />
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default TrainingList;