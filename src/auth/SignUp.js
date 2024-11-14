import React, { useState } from "react";
import { post } from "../services/axiosService";
import { useNavigate } from "react-router-dom";
import { apiEndPoints } from "../Constants/urls";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Password validations
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await post(apiEndPoints.SIGNUP, formData);
      setSuccess("Registration successful!");
      setError("");
      navigate('/login');
    } catch (error) {
      setError("Registration failed. Please check the details.");
      setSuccess("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
