import React, { useState } from "react";
import { forgotPassword } from "./apiUser";
import "./css/ForgotPassword.css";
import InfoMessages from "../Notifications/InfoMessages";
import ErrorMessage from "../Notifications/ErrorMessage";
import SuccessMessage from "../Notifications/SuccessMessage";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await forgotPassword(email);
      setEmail(" ");
      setMessage(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    setMessage(false);
    setEmail(event.target.value);
  };
  const showMessage = () => {
    if (message) {
      if (message === "User with this email not found") {
        return (
          <div>
            <ErrorMessage message={message} />
          </div>
        );
      } else {
        return (
          <div>
            <SuccessMessage message={message} />
          </div>
        );
      }
    }
  };
  return (
    <>
      {showMessage()}
      <div className="forgot-pw-cont">
        <h1>Forgot Password</h1>
        {/* {JSON.stringify(successMessage)} */}
        <form onSubmit={handleSubmit} className="forgot-pw-form">
          <label>Enter email</label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
