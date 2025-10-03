import { useState } from 'react'
import { addClient } from '../../api/clients';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProgramSelector from './ProgramSelector';


function AddClientForm() {
    const { userId } = useParams();
    const navigate = useNavigate();
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
        activityLevel: "",
        birthDate: "",
        sex: "MAN",
        program: "",
        ownerId: userId
    });

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
                activityLevel: "",
                birthDate: "",
                originalWeight: "",
                goalWeight: "", });
            setSuccessMessage("Client added successfully!");
            setErrorMessage("");
            navigate(`/profile/${userId}`);
           
        } catch (error) {
            if(error.response && error.response.status === 400){
                const backkendErrors = error.response.data.errors || {};
                setErrors(backkendErrors);
            }else{alert("An unexpected error occurred. Please try again later.");}
            
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
        {errors.firstName &&(
        <small className="text-danger">{errors.firstName}</small>
        )}
      </div>

      <div className="col-md-6">
        <label className="form-label">Last Name</label>
        <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
        {errors.lastName &&(
        <small className="text-danger">{errors.lastName}</small>
        )}
      </div>

      <div className="col-md-6">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        {errors.email &&(
        <small className="text-danger">{errors.email}</small>
        )}
      </div>

      <div className="col-md-6">
        <label className="form-label">Phone Number</label>
        <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        {errors.phoneNumber &&(
        <small className="text-danger">{errors.phoneNumber}</small>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label">Country</label>
        <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
        {errors.country &&(
        <small className="text-danger">{errors.country}</small>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label">City</label>
        <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
        {errors.city &&(
        <small className="text-danger">{errors.city}</small>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label">Zip Code</label>
        <input type="text" className="form-control" name="zipCode" value={formData.zipCode} onChange={handleChange} />
        {errors.zipCode &&(
        <small className="text-danger">{errors.zipCode}</small>
        )}
      </div>

      <div className="col-12">
        <label className="form-label">Street</label>
        <input type="text" className="form-control" name="street" value={formData.street} onChange={handleChange} />
        {errors.street &&(
        <small className="text-danger">{errors.street}</small>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label">Height (cm)</label>
        <input type="number" step="0.01" className="form-control" name="height" value={formData.height} onChange={handleChange} />
        {errors.height &&(
        <small className="text-danger">{errors.height}</small>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label">Original Weight (kg)</label>
        <input type="number" step="0.01" className="form-control" name="originalWeight" value={formData.originalWeight} onChange={handleChange} />
        {errors.originalWeight &&(
        <small className="text-danger">{errors.originalWeight}</small>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label">Goal Weight (kg)</label>
        <input type="number" step="0.01" className="form-control" name="goalWeight" value={formData.goalWeight} onChange={handleChange} />
        {errors.goalWeight &&(
        <small className="text-danger">{errors.goalWeight}</small>
        )}
      </div>

      <div className="col-md-6">
        <label className="form-label">Sex</label>
        <select className="form-select" name="sex" value={formData.sex} onChange={handleChange}>
          <option value="MAN">Male</option>
          <option value="WOMAN">Female</option>
        </select>
      </div>

      <div className='col-md-6'>
        <label  className="form-label">Activity level</label>
        <input type="range" name="activityLevel" value={formData.activityLevel} className="form-range" min="1" max="5" step="1"  onChange={handleChange} ></input>
          <span>{formData.activityLevel}</span> {/* 👈 Pre zobrazenie hodnoty */}
        {errors.activityLevel &&(
        <small className="text-danger">{errors.activityLevel}</small>
        )}
      </div>

      <div className='col-md-6'>
        <label className="form-label">Birth Date</label>
        <input type="date" className="form-control" name="birthDate" value={formData.birthDate} onChange={handleChange} />
        {errors.birthDate &&(
        <small className="text-danger">{errors.birthDate}</small>
        )}

      </div>

      <div className="col-md-6">
        <label className="form-label">Program</label>
        <ProgramSelector handleInputChange={handleChange} newProgram={formData.program}/>
        {errors.program &&(
        <small className="text-danger">{errors.program}</small>
        )}
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