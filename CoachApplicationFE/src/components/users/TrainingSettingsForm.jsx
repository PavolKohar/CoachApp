import { addTrainingSettingsToUser } from "../../api/users";
import { useState } from "react";


function TrainingSettingsForm ({userId}){

    const [data,setData] = useState({
        price: "",
        durationInMinutes: "",
        name: ""
    });
    const [errors, setErrors] = useState({});
    


    const handleChange = (e) =>{
        const {name,value} = e.target;
        setData((prevData) =>({
            ...prevData,
            [name]: value,
        }));
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addTrainingSettingsToUser(userId,data);
            console.log("Success - adding settings") // TODO delete this 
            

            setData({
                price: "",
                durationInMinutes: "",
                name: ""
            })

            // TODO Set successmessage and error message

        } catch (error) {
         if (error.response && error.response.status === 400) {
         const backkendErrors = error.response.data.errors || {};
             setErrors(backkendErrors);
        } else {
            alert("An unexpected error occurred. Please try again later.");
        }

        console.error("Error adding client:", error);
            
        }
    }

    return(<>

<div className="container mt-4">
  <form onSubmit={handleSubmit} className="row g-3">
    <h3 className="text-primary">Add New Training Settings</h3>
    <hr />

    <div className="col-md-12">
      <label className="form-label">Title</label>
      <input type="text" className="form-control" name="name" value={data.name} onChange={handleChange} required />
      {errors.name && <small className="text-danger">{errors.name}</small>}
    </div>

    <div className="col-md-6">
      <label className="form-label">Expected Duration (minutes)</label>
      <input type="number" className="form-control" name="durationInMinutes" value={data.durationInMinutes} onChange={handleChange} />
      {errors.durationInMinutes && <small className="text-danger">{errors.durationInMinutes}</small>}
    </div>

    <div className="col-md-6">
      <label className="form-label">Price per Training (€)</label>
      <input type="number" className="form-control" name="price" value={data.price} onChange={handleChange} />
      {errors.price && <small className="text-danger">{errors.price}</small>}
    </div>

    <div className="col-12">
      <button type="submit" className="btn btn-success">Add Settings</button>
    </div>
  </form>
</div>
    
    
    
         </>
    )


}

export default TrainingSettingsForm;