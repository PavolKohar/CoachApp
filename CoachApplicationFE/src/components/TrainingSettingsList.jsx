import TrainingSettingsCard from "./TrainingSettingsCard";
import { useState } from "react";

function TrainingSettingsList ({setts}){
   
      if (!setts) {
    return <p>Loading settings...</p>; // alebo null
  }
   
   
    return(
                <div className="d-flex  align-items-center">
  <div className="card shadow mb-4" style={{ width: "100%", maxWidth: "300px" ,maxHeight: "500px" }}>
    <div className="card-header bg-success text-white">
      <h5 className="mb-0">All settings</h5>
    </div>
    <div className="card-body" style={{ maxHeight: "300px", overflowX: "auto" }}>
      {setts.length === 0 ? (
        <p className="text-center">No settings available.</p>
        

      ) : (
        setts.map((sett) => <TrainingSettingsCard key={sett.id} data={sett} />)
      )}
    </div>
  </div>
</div>
    )
}

export default TrainingSettingsList;