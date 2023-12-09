import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      validateForm();

      const response = await axios.get("http://localhost:3000/users");
      const user = response.data.find((user) => user.email === formData.email);

      if (user) {
        if (user.password === formData.password) {
          toast.success("Login successful");
          navigate("/");
        } else {
          toast.error("Wrong password");
        }
      } else {
        toast.error("User not found, Please register yourself!");
      }
    } catch (error) {
      console.error("Error while processing the form:", error);
    }
  };

  const validateForm = () => {
    let isvalid = true;
    let validationErrors = {};

    if (!formData.email || formData.email.trim() === "") {
      isvalid = false;
      validationErrors.email = "Email is required";
    }
    if (!formData.password || formData.password.trim() === "") {
      isvalid = false;
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      isvalid = false;
      validationErrors.password = "Password should be at least 8 characters";
    }

    setErrors(validationErrors);

    if (!isvalid) {
      throw new Error("Form validation failed");
    }
  };

  return (
    <div className="conta">
      <div className="container">
        <div className="box">
          <div className="shadow"></div>
          <div className="cover"></div>
          <div className="content">
            <div className="form">
              <div className="logo">
                <i className="icon"><i class="fa-solid fa-key"></i></i>
              </div>
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="inputBox">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <i class="fa-solid fa-user"></i>
                  <label>Email</label>
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>

                <div className="inputBox">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <i class="fa-solid fa-lock"></i>
                  <label>Password</label>
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
                <div className="inputBox">

                <button type="submit">Login</button>
                </div>

                <div className="links">
                  <p>
                    Don't have an account?{" "}
                    <span
                      className="RegisterNav"
                      onClick={() => {
                        navigate("/signup");
                      }}
                      style={{ color: "blue" }}
                    >
                      Register here
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
