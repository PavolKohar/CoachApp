import { useState } from 'react'
import { addClient } from '../../api/clients';


function AddClientForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        country: "",
        city: "",
        zipCode: "",
        street: "",
        height: "",
        originalWeight: "",
        goalWeight: "",
        sex: "MAN",
        program: ""
    });

    const[successMessage, setSuccessMessage] = useState("");
    const[errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addClient(formData);
            console.log("Client added successfully:", response);
            // Optionally reset the form or provide feedback to the user
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                country: "",
                city: "",
                zipCode: "",
                street: "",
                height: "",
                originalWeight: "",
                goalWeight: "", });
            setSuccessMessage("Client added successfully!");
            setErrorMessage("");
           
        } catch (error) {
            console.error("Error adding client:", error);
            setErrorMessage("Failed to add client. Please try again.");
            setSuccessMessage("");
        }
         
    };

    return(
        <>
        <div className="container">
        <form onSubmit={handleSubmit} className="row g-3">
      <h2 className="text-center text-primary" >Add New Client</h2>
      {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      <hr />

      <div className="col-md-6">
        <label className="form-label">First Name</label>
        <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>

      <div className="col-md-6">
        <label className="form-label">Last Name</label>
        <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>

      <div className="col-md-6">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="col-md-6">
        <label className="form-label">Phone Number</label>
        <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </div>

      <div className="col-md-4">
        <label className="form-label">Country</label>
        <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
      </div>

      <div className="col-md-4">
        <label className="form-label">City</label>
        <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
      </div>

      <div className="col-md-4">
        <label className="form-label">Zip Code</label>
        <input type="text" className="form-control" name="zipCode" value={formData.zipCode} onChange={handleChange} />
      </div>

      <div className="col-12">
        <label className="form-label">Street</label>
        <input type="text" className="form-control" name="street" value={formData.street} onChange={handleChange} />
      </div>

      <div className="col-md-4">
        <label className="form-label">Height (cm)</label>
        <input type="number" step="0.01" className="form-control" name="height" value={formData.height} onChange={handleChange} />
      </div>

      <div className="col-md-4">
        <label className="form-label">Original Weight (kg)</label>
        <input type="number" step="0.01" className="form-control" name="originalWeight" value={formData.originalWeight} onChange={handleChange} />
      </div>

      <div className="col-md-4">
        <label className="form-label">Goal Weight (kg)</label>
        <input type="number" step="0.01" className="form-control" name="goalWeight" value={formData.goalWeight} onChange={handleChange} />
      </div>

      <div className="col-md-6">
        <label className="form-label">Sex</label>
        <select className="form-select" name="sex" value={formData.sex} onChange={handleChange}>
          <option value="MAN">Male</option>
          <option value="WOMAN">Female</option>
        </select>
      </div>

      <div className="col-md-6">
        <label className="form-label">Program</label>
        <input type="text" className="form-control" name="program" value={formData.program} onChange={handleChange} />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-success">Add Client</button>
      </div>
    </form>
    </div>

        
        
        
        </>
    )
}

export default AddClientForm;