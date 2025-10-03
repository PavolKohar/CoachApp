import { deleteWeightRecord } from "../../api/clients";

function WeightRecord({ oneRecord , onDelete }) {
  
  const handleDelete = async () => {
    if(window.confirm("Are you sure to delete this record ?")){
      try {
        await deleteWeightRecord(oneRecord.id)
        onDelete(oneRecord.id)
        
      } catch (error) {
        alert("Failed to delete record")
        
      }
    }
  }
  
  
  
  
  return (
    <div
      className="card shadow-sm mb-3"
      style={{ width: "300px", fontSize: "0.9rem", borderRadius: "10px" }}
    >
      <div className="card-body p-3">
        <div className="d-flex justify-content-between">
        <h6 className="card-title text-muted mb-2">
          {new Date(oneRecord.date).toLocaleDateString()} :{" "}
          <span
          className="text-dark"
          >
            {oneRecord.difference > 0 ? "+" : ""}
            {oneRecord.difference} kg
          </span>
        </h6>
        <button className="btn btn-sm btn-danger" onClick={handleDelete} >🗑️</button>
        </div>
        <p className="mb-1">
          <small className="text-muted">Old weight:</small>{" "}
          <span>{oneRecord.oldWeight} kg</span>
        </p>
        <p className="mb-0">
          <small className="text-muted">New weight:</small>{" "}
          <strong>{oneRecord.newWeight} kg</strong>
        </p>
      </div>
    </div>
  );
}

export default WeightRecord;