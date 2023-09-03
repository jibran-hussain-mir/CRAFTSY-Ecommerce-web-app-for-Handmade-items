import React, { useState } from "react";
import "./css/Signup.css";
import { userSignup } from "../auth/index";
import "../user/css/Signup.css";
import { NavLink } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { FcShop } from "react-icons/fc";
import signupimg from "../assets/signup.jpg";
import ErrorMessage from "../Notifications/ErrorMessage";
import SuccessMessage from "../Notifications/SuccessMessage";

const Signup = () => {
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const showSuccess = () => {
    if (userRegistration.success) {
      return (
        <div>
          <SuccessMessage message="Seller Created Successfully" />
        </div>
      );
    }
  };
  const showError = () => {
    if (userRegistration.error) {
      return (
        <div>
          <ErrorMessage message={userRegistration.error} />
        </div>
      );
    }
  };
  const handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setUserRegistration({
      ...userRegistration,
      error: "",
      success: false,
      [field]: value,
    });
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
      {showSuccess()}
      {showError()}
      <div className="signup-main-container">
        <div className="signup-image-cont hidden">
          <img src={signupimg} alt="qll" className="signin-image hide" />
          <div className="logo-container">
            <h1 className="img-name">
              <span className="logo-welcome">Welcome to</span>{" "}
              <span className="logo-name">Craftsy</span>
            </h1>
          </div>
        </div>
        <div>
          <div className="signup-form-cont">
            <div className="signup-form">
              <div className="sign-up-section">
                <h1 className="signup-h1-login">SIGN UP</h1>
                <NavLink to="/signin" className="signup-NavLinks">
                  <h6 className="signup-addH4">
                    <span className="signup-addSvg">
                      <FaUserFriends size={16} />
                    </span>
                    Already have an account?
                  </h6>
                </NavLink>
                <NavLink to="/seller-signup" className="signup-NavLinks">
                  <h6 className="signup-addH4">
                    <span className="signup-addSvg">
                      <FcShop size={16} />
                    </span>
                    Become a Seller?
                  </h6>
                </NavLink>
                {/* {userRegistration.error && (
                  <div>
                    <h3>{userRegistration.error}</h3>
                  </div>
                )} */}
                <form
                  method="POST"
                  onSubmit={handleSubmit}
                  className="signup-form"
                >
                  <div className="signup-form-field">
                    <label htmlFor="full-name">Name</label>
                    <input
                      type="signup-name"
                      name="name"
                      placeholder="Your Name"
                      value={userRegistration.name}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="signup-form-field">
                    <label htmlFor="from-email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={userRegistration.email}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="signup-form-field">
                    <label htmlFor="Password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Your Password"
                      value={userRegistration.password}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="signup-form-field">
                    <button className="signup-btn ">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
