import React, { useState } from "react";
import { post } from "../services/axiosService";
import { apiEndPoints } from "../Constants/urls";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login method

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post(apiEndPoints.SIGNIN, formData);
      setSuccess("Login successful!");
      setError("");
      localStorage.setItem("token", response.token);
      login(response.token);
      localStorage.setItem("loggeduser", JSON.stringify(response.user));

      navigate("/");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      setSuccess("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Sign In</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}

        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
