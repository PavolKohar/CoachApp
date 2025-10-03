import WeightRecord from "./WeightRecord";
import { Link } from "react-router-dom";

function WeightList({ weightRecords }) {
  return (
<div className="my-4">
  
  

  
  <div
    className="d-flex flex-row gap-3 overflow-auto"
    style={{
      whiteSpace: "nowrap",
      paddingBottom: "1rem",
      scrollSnapType: "x mandatory"
    }}
  >
        {weightRecords.length === 0 ? (
        <div className="text-muted">No records available.</div>
        ) : (
        weightRecords
            .slice() // vytvorí kópiu poľa, aby sme nemenili originál
            .reverse() // otočí poradie (najnovší záznam prvý)
            .map((rec) => (
            <div key={rec.id} style={{ scrollSnapAlign: "start" }}>
                <WeightRecord oneRecord={rec} />
            </div>
            ))
        )}
  </div>
</div>
  );
}

export default WeightList;