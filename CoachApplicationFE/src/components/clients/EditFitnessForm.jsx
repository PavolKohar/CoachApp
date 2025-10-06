import { useState } from "react";
import { updateClientFitness } from "../../api/clients";


function EditFitnessForm (client) {

    const [formData , setFormData] = useState({
        goalWeight: client.goalWeight,
        activityLevel: client.activityLevel,
        program: client.program
})

    const [successMessage,setSuccessMessage] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const [errors,setErrors] = useState("");


    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await updateClientFitness(client.clientId,formData);
            console.log("Response: " ,response)
            setSuccessMessage("Client edited");
            setErrorMessage("");
            
        } catch (error) {
         if (error.response && error.response.status === 400) {
            const backkendErrors = error.response.data.errors || {};
            setErrors(backkendErrors);
        } else {
            alert("An unexpected error occurred. Please try again later.");
        }

        console.error("Error adding client:", error);
        setErrorMessage("Failed to add client. Please try again.");
        setSuccessMessage("");
    }
            
 }
      
    return(
        <>

        {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}


        <form onSubmit={handleSubmit} >

        <div className="col-md-4">
            <label className="form-label">Goal Weight (kg)</label>
            <input type="number" step="0.01" className="form-control" name="goalWeight" value={client.goalWeight} onChange={handleChange} />
            {errors.goalWeight &&(
            <small className="text-danger">{errors.goalWeight}</small>
            )}
        </div>

        <div className='col-md-6'>
            <label  className="form-label">Activity level</label>
            <input type="range" name="activityLevel" value={client.activityLevel} className="form-range" min="1" max="5" step="1"  onChange={handleChange} ></input>
            <span>{formData.activityLevel}</span> {/* 👈 Pre zobrazenie hodnoty */}
            {errors.activityLevel &&(
            <small className="text-danger">{errors.activityLevel}</small>
            )}
        </div>

        <div className="col-md-6">
            <label className="form-label">Program</label>
            <ProgramSelector handleInputChange={handleChange} newProgram={client.program}/>
            {errors.program &&(
            <small className="text-danger">{errors.program}</small>
            )}
        </div>








        </form>
        
        
        
        
        </>
    )
}

export default EditFitnessForm;