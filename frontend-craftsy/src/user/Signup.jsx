import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Signup.css";
import { userSignup } from "../auth/index";
import Header from "../core/Header";
import "../user/css/Signup.css";
import SignupImg from "../assets/signup.png";

const Signup = () => {
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setUserRegistration({ ...userRegistration, error: "", [field]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    userSignup({ ...userRegistration }).then((res) => {
      if (res.error) {
        setUserRegistration({
          ...userRegistration,
          error: res.error[0].msg,
          success: false,
        });
      } else {
        setUserRegistration({
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  return (
    <>
      <div className="signup signup-container">
        <img src={SignupImg} alt="qll" className="signup-image" />
        <div>
          {/* If any error occured */}
          {userRegistration.error && (
            <div>
              <h3>{userRegistration.error}</h3>
            </div>
          )}

          {/* If the From is submitted successfully */}
          {userRegistration.success && (
            <div className="form-container">
              <h3>
                New Account has been created Successfully.{" "}
                <Link to="/signin">Signin</Link> to continue...
              </h3>
            </div>
          )}

          <form method="POST" onSubmit={handleSubmit}>
            <label htmlFor="full-name" className="form-name">
              Name
            </label>
            <br />
            <br />
            <input
              className="form-input-name"
              type="text"
              name="name"
              placeholder="Your Name"
              value={userRegistration.name}
              onChange={handleChange}
              autoComplete="off"
            />
            <br />

            <label htmlFor="email" className="form-email">
              Email
            </label>
            <br />
            <br />
            <input
              className="form-input-email"
              type="text"
              name="email"
              placeholder="Your Email"
              value={userRegistration.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <br />

            <label htmlFor="Password" className="form-password">
              Password
            </label>
            <br />
            <br />
            <input
              className="form-input-password"
              type="password"
              name="password"
              placeholder="Your Password"
              value={userRegistration.password}
              onChange={handleChange}
              autoComplete="off"
            />
            <br />

            <button className="form-btn-submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
