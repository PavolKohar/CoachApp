import React, { useState, useEffect } from "react";
import { addNewTrainingPlan } from "../../api/training";
import { useParams } from "react-router-dom";
import { getAllTrainingSettingsForUser } from "../../api/users";
import { getClientsForUser } from "../../api/users";


const dayNames = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

function TrainingPlanForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    clientId: "",
    weeks: 4,
    workoutsPerWeek: 3,
    startDate: "",
    preferredTime: "",
    settingsId: "",
    excludedDays: [],
  });

  const {userId} = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [clients,setClients] = useState([]);
  const [settingList,setSettingList] = useState([]);
  

  // 🔎 Validácia počtu dní
  useEffect(() => {
    const availableDays = 7 - formData.excludedDays.length;

    if (formData.workoutsPerWeek > availableDays) {
      setErrorMessage(`You selected only ${availableDays} available training days, but you want ${formData.workoutsPerWeek} workouts per week.`);
    } else {
      setErrorMessage("");
    }
  }, [formData.workoutsPerWeek, formData.excludedDays]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (dayIndex) => {
    setFormData(prev => {
      const alreadyExcluded = prev.excludedDays.includes(dayIndex);
      const newExcludedDays = alreadyExcluded
        ? prev.excludedDays.filter(d => d !== dayIndex)
        : [...prev.excludedDays, dayIndex];

      return { ...prev, excludedDays: newExcludedDays };
    });
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [clientResponse, settingsResponse] = await Promise.all([
        getClientsForUser(userId),
        getAllTrainingSettingsForUser(userId),
      ]);
      setClients(clientResponse);
      setSettingList(settingsResponse);
    } catch (error) {
      console.error("Error fetching client/settings data:", error);
    }
  };

  fetchData();
}, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errorMessage) return;

    try {
      // API call 
      await addNewTrainingPlan(userId, formData);
     
      setErrorMessage("");
      setSuccessMessage("Training plan created successfully!");
      setFormData({
        clientId: "",
        weeks: 4,
        workoutsPerWeek: 3,
        startDate: "",
        preferredTime: "",
        settingsId: "",
        excludedDays: [],
      });
    } catch (error) {
      console.error("Error submitting plan:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h4>Create Training Plan</h4>
      <hr />

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
            <label className="form-label">Client</label>
            <select name="clientId" className="form-select" value={formData.clientId} onChange={handleChange}>
            <option disabled value="">-- Select client --</option>
            {clients.map(client => (
                <option key={client.clientId} value={client.clientId}>
                {client.firstName + " " + client.lastName}
                </option>
            ))}
            </select>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Weeks</label>
            <input type="number" name="weeks" className="form-control"
              value={formData.weeks} onChange={handleChange} min={1} />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Workouts per week</label>
            <input type="number" name="workoutsPerWeek" className="form-control"
              value={formData.workoutsPerWeek} onChange={handleChange} min={1} max={6} />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Start date</label>
            <input type="date" name="startDate" className="form-control"
              value={formData.startDate} onChange={handleChange} required />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Preferred Time</label>
          <input type="time" name="preferredTime" className="form-control"
            value={formData.preferredTime} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Exclude training on these days:</label>
          <div className="d-flex flex-wrap gap-2">
            {dayNames.map((day, index) => (
              <div className="form-check" key={index}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`day-${index}`}
                  checked={formData.excludedDays.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label className="form-check-label" htmlFor={`day-${index}`}>{day}</label>
              </div>
            ))}
          </div>
        </div>

              <div className="mb-3">
        <label className="form-label">Training Settings</label>
        <select name="settingsId" className="form-select" value={formData.settingsId} onChange={handleChange} required>
          <option value="">-- Select settings --</option>
          {settingList.map(sett => (
            <option key={sett.id} value={sett.id}>
              {sett.name}
            </option>
          ))}
        </select>
      </div>

        <button type="submit" className="btn btn-success" disabled={!!errorMessage}>
          Create Plan
        </button>
      </form>
    </div>
  );
}

export default TrainingPlanForm;