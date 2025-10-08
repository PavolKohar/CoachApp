import TrainingPlanCard from "./TrainingPlanCard";


function TrainingPlanList({ plans, userId ,header = "Training Plans" }) {
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
        {plans.length === 0 ? (
          <div className="text-muted">No training plans available.</div>
        ) : (
          plans
            .slice()
            .reverse()
            .map((plan) => (
              <div key={plan.id} style={{ scrollSnapAlign: "start" }}>
                <TrainingPlanCard plan={plan} userId={userId} />
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default TrainingPlanList;