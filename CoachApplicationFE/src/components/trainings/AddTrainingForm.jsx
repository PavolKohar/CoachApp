import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllTrainingSettingsForUser } from "../../api/users";
import { getClientsForUser } from "../../api/users";
import { addNewTraining } from "../../api/training";
import { useNavigate } from "react-router-dom";


function AddTrainingForm() {
    const {userId} = useParams();
    const navigate = useNavigate();

    const [clients,setClients] = useState([]);
    const [settingList,setSettingList] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        clientId: "",
        settingsId : "",
    })


    useEffect(()=>{
        const fetchOptions = async () => {
            try {
                const [clientResponse, settingsResponse] = await Promise.all([
                    getClientsForUser(userId),
                    getAllTrainingSettingsForUser(userId)     
                ]);
                setClients(clientResponse);
                setSettingList(settingsResponse);

            } catch (error) {
                console.error("Error fetching options " , error)
                
            }
        };
        fetchOptions();
    },[userId])

    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormData(prev => ({...prev,[name]: value}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addNewTraining(userId,formData);
            console.log("Training created" , response);
            // TODO - Add success message
            navigate(-1)
            
        } catch (error) {
            console.error("Error creating training :" , error);
            
        }
    };

      return (
        <div className="container mt-3">

        
    <form onSubmit={handleSubmit}>
      <h3>Create new Training</h3>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea name="description" className="form-control" value={formData.description} onChange={handleChange}></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Date</label>
        <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Time</label>
        <input type="time" name="time" className="form-control" value={formData.time} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Client</label>
        <select name="clientId" className="form-select" value={formData.clientId} onChange={handleChange}>
          <option value="">-- No client --</option>
          {clients.map(client => (
            <option key={client.clientId} value={client.clientId}>
              {client.firstName + " " + client.lastName}
            </option>
          ))}
        </select>
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

      <button type="submit" className="btn btn-success">Create Training</button>
    </form>
    </div>
  );

}


export default AddTrainingForm;