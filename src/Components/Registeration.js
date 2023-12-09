import React, { useState } from "react";
import axios from "axios";
import "./Re.css";
// import './Register.css'
// import "../Css/sForm.css"

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [error, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form validation and submission logic here
    console.log(formData);
    let isvalid = true;
    let validationerros = {};
    if (formData.firstName === "" || formData.firstName == null) {
      isvalid = false;
      validationerros.firstName = "First name is required";
    }
    if (formData.lastName === "" || formData.lastName === null) {
      isvalid = false;
      validationerros.lastName = "Last name is required";
    }
    if (formData.email === "" || formData.email === null) {
      isvalid = false;
      validationerros.email = "Email is required";
    }

    if (formData.password === "" || formData.password === null) {
      isvalid = false;
      validationerros.password = "password  is required";
    } else if (formData.password.length < 6) {
      isvalid = false;
      validationerros.password = "password length should be atleat 8characters";
    }

    if (formData.password === "" || formData.password === null) {
      isvalid = false;
      validationerros.password = "password  is required";
    } else if (formData.password.length < 6) {
      isvalid = false;
      validationerros.password = "password length should be atleat 8characters";
    }

    if (formData.confirmPassword !== formData.password) {
      isvalid = false;
      //validationerros.confirmPassword = "password  not matched";
    }
    setErrors(validationerros);
    setValid(isvalid);

    if (Object.keys(validationerros).length == 0) {
      alert("Registered succesfull");
      navigate("/login");
      axios
        .post("http://localhost:3000/users", formData)
        .then(console.log(formData))
        .catch((err) => console.log(err, "err while posting"));
    }
  };
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>
        <u>Sign up</u>
      </h2>
      <div className=" form1">
        <div className="input-group">
          <label className="label">
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          {error.firstName && <span className="error">{error.firstName}</span>}
        </div>
        <div className="input-group">
          <label className="label">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          {error.lastName && <span className="error">{error.lastName}</span>}
        </div>
        <div className="input-group">
          <label className="label">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          {error.email && <span className="error">{error.email}</span>}
        </div>
        <div className="input-group">
          <label className="label">
            Mobile Number:
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
            />
          </label>
          {/* {error.email && <span className="error">{error.email}</span>} */}
        </div>
        <div className="input-group">
          <label className="label">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          {error.password && <span className="error">{error.password}</span>}
        </div>
        <div className="input-group">
          <label className="label">
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </label>
          {error.confirmPassword && (
            <span className="error">{error.confirmPassword}</span>
          )}
        </div>
        <button type="submit">Submit</button>
        <p>
          Click here for{" "}
          <span
            className="LoginNav"
            onClick={() => {
              navigate("/login");
            }}
            style={{ color: "blue" }}
          >
            <u> login</u>
          </span>
        </p>
      </div>
    </form>
  );
};

export default Register;
