import { useState } from "react";
import { registerUser } from "../api/users";


function Register() {
    const [formData, setFormData] = useState({
        birthDate: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

   const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            console.log("User registered successfully:", response);
            setSuccessMessage("Registration successful! You can now log in.");
            setErrors({});
            setFormData({
                birthDate: '',
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                phoneNumber: ''
            });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data);
            } else {
                console.error("Error registering user:", error);
            }
            setSuccessMessage('');
        }
    }


    return (<>
    <div className="container my-5">
      <h2 className="text-center text-primary">Register</h2>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
          {errors.username && <small className="text-danger">{errors.username}</small>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone Number</label>
          <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Birth Date</label>
          <input type="date" className="form-control" name="birthDate" value={formData.birthDate} onChange={handleChange} />
          {errors.birthDate && <small className="text-danger">{errors.birthDate}</small>}
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-success px-5">Register</button>
        </div>
      </form>
    </div>

    
    
    
    
    
    
    
    
    
    
    
    </>)



}

export default Register;