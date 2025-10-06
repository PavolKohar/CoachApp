import { useState } from "react";
import { updateClientAddress } from "../../api/clients";

function EditAddressForm ({client,userId}){

    const [formData,setFormData] = useState({
        country: client.country,
        city: client.city,
        zipCode: client.zipCode,
        street: client.street
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
            const response = await updateClientAddress(client.clientId,formData);
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

 <form onSubmit={handleSubmit} >
          <div className="col-md-12 mb-3">
        <label className="form-label">Country</label>
        <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
        {errors.country &&(
        <small className="text-danger">{errors.country}</small>
        )}
      </div>

        <div className="col-md-12 mb-3">
        <label className="form-label">City</label>
        <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
        {errors.city &&(
        <small className="text-danger">{errors.city}</small>
        )}
      </div>


      <div className="col-md-12 mb-3">
        <label className="form-label">Zip Code</label>
        <input type="text" className="form-control" name="zipCode" value={formData.zipCode} onChange={handleChange} />
        {errors.zipCode &&(
        <small className="text-danger">{errors.zipCode}</small>
        )}
      </div>

        <div className="col-12 mb-3">
        <label className="form-label">Street</label>
        <input type="text" className="form-control" name="street" value={formData.street} onChange={handleChange} />
        {errors.street &&(
        <small className="text-danger">{errors.street}</small>
        )}
      </div>


        <div className="col-12">
        <button type="submit" className="btn btn-success">Save changes</button>
      </div>




 </form>
 
 
 
 
 
 
 
 
 
 
 
 
        </>)





}

export default EditAddressForm;