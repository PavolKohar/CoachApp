import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrainingById, updateTraining } from "../../api/training"; 
import TrainingCard from "./TrainingCard";
import { getAllTrainingSettingsForUser } from "../../api/users";
import { useNavigate } from "react-router-dom";
import { deleteTraining } from "../../api/training";

function TrainingPage() {
  const { userId,trainingId } = useParams();
  const [training, setTraining] = useState(null);
  const [settingList,setSettingList] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    done: "",
    settingsId: ""
  });

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const data = await getTrainingById(trainingId);
        const setResponse = await getAllTrainingSettingsForUser(userId)
        setSettingList(setResponse);
        setTraining(data);
        setFormData({
          title: data.title || "",
          description: data.description || "",
          date: data.date || "",
          time: data.time || "",
          done: data.done || false,
          settingsId: data.settingsId || ""
        });
      } catch (error) {
        console.error("Error fetching training", error);
      }
    };
    fetchTraining();
  }, [trainingId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleBackClick = () =>{
    navigate(-1)
  }

  const handleDeleteClick = ()=> {
    if(window.confirm("Are you sure to delete this training ?"))
    try{
        deleteTraining(trainingId);
        navigate(-1)
    }catch(error){
        console.error("Error deleting training")
    }
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await updateTraining(trainingId, formData);
    
    const updatedTraining = await getTrainingById(trainingId);
    console.log(updatedTraining)
    setTraining(updatedTraining);
  } catch (err) {
    console.error("Failed to update training", err);
    alert("Failed to update training");
  }
};

  if (!training) return <div className="container my-4">Loading...</div>;

  return (
    <>
    <div className="container my-2">
        <button className="btn btn-success" onClick={handleBackClick}>↩️</button>
        <button className="btn btn-danger ms-2" onClick={handleDeleteClick} >Remove training</button>
    </div>
      <TrainingCard training={training} />
      <div className="container mt-4">
        <hr />
        <h4>Update Training</h4>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Time</label>
              <input
                type="time"
                name="time"
                className="form-control"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              name="done"
              className="form-check-input"
              id="doneCheck"
              checked={formData.done}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="doneCheck">
              Done
            </label>
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

          <button type="submit" className="btn btn-success">
            Update Training
          </button>
        </form>
      </div>
    </>
  );
}

export default TrainingPage;