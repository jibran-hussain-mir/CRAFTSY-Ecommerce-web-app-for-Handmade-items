import React, { useState } from "react";
import { Params, useParams } from "react-router-dom";
import { resetPassword } from "./apiUser";
import "./css/ResetPassword.css";
import ErrorMessage from "../Notifications/ErrorMessage";
import SuccessMessage from "../Notifications/SuccessMessage";

const ResetPassword = () => {
  const { id, token } = useParams();
  console.log(id, token);
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (name) => (event) => {
    if (name === "newPassword") {
      setnewPassword(event.target.value);
      setMessage(false);
    }
    if (name === "confirmNewPassword") {
      setConfirmNewPassword(event.target.value);
      setMessage(false);
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (newPassword === confirmNewPassword) {
        const response = await resetPassword(id, token, newPassword);
        setMessage(response);
        setnewPassword("");
        setConfirmNewPassword("");
      } else {
        setMessage("Passwords must be same");
        setnewPassword("");
        setConfirmNewPassword("");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const showMessage = () => {
    if (message) {
      if (message === "Passwords must be same") {
        return (
          <div>
            <ErrorMessage message={message} />
          </div>
        );
      } else if (message === "Password changed successfully") {
        return (
          <div>
            <SuccessMessage message={message} />
          </div>
        );
      } else {
        return (
          <div>
            <ErrorMessage message="Link has been expired" />
          </div>
        );
      }
    }
  };
  return (
    <>
      {showMessage()}
      <div className="reset-password-cont">
        <h1 className="res-h1-o">Reset Password</h1>
        {/* {JSON.stringify(message)} */}
        <form onSubmit={handleSubmit} className="reset-password-form">
          <label>New Password</label>
          <input
            type="password"
            onChange={handleChange("newPassword")}
            value={newPassword}
          />
          <br></br>
          <label>Confirm New Password</label>

          <input
            type="password"
            onChange={handleChange("confirmNewPassword")}
            value={confirmNewPassword}
          />
          <button>Reset Password</button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
