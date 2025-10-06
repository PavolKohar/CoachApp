import { useState } from "react";
import { updateClientContact } from "../../api/clients";

function EditContactForm ({client,userId}){

    const [formData,setFormData] = useState({
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phoneNumber: client.phoneNumber
    })

        const[successMessage, setSuccessMessage] = useState("");
        const[errorMessage, setErrorMessage] = useState("");
        const[errors, setErrors] = useState({});
    
    
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
                const response = await updateClientContact(client.clientId,formData);
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
                
     };


     return(<>

        {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
     
     <form onSubmit={handleSubmit}>
        <div className="col-md-12 mb-3">
        <label className="form-label">First Name</label>
        <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
        {errors.firstName &&(
        <small className="text-danger">{errors.firstName}</small>
        )}
      </div>


      <div className="col-md-12 mb-3">
        <label className="form-label">Last Name</label>
        <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
        {errors.lastName &&(
        <small className="text-danger">{errors.lastName}</small>
        )}
      </div>

      <div className="col-md-12 mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        {errors.email &&(
        <small className="text-danger">{errors.email}</small>
        )}
      </div>


      <div className="col-md-12 mb-3">
        <label className="form-label">Phone Number</label>
        <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        {errors.phoneNumber &&(
        <small className="text-danger">{errors.phoneNumber}</small>
        )}
      </div>


      <div className="col-12">
        <button type="submit" className="btn btn-success">Save changes</button>
      </div>





      </form>
     
     
     
     
     
     
     
        
        </>)


}


export default EditContactForm;