import React, { useState } from "react";
import { Params, useParams } from "react-router-dom";
import { resetPassword } from "./apiUser";

const ResetPassword = () => {
  const { id, token } = useParams();
  console.log(id, token);
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (name) => (event) => {
    if (name === "newPassword") setnewPassword(event.target.value);
    if (name === "confirmNewPassword")
      setConfirmNewPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await resetPassword(id, token, newPassword);
      setMessage(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {JSON.stringify(message)}
      <form onSubmit={handleSubmit}>
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
    </>
  );
};

export default ResetPassword;
