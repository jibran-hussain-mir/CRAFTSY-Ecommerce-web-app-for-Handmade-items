import React, { useState } from "react";
import { forgotPassword } from "./apiUser";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(" ");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await forgotPassword(email);
      setEmail(" ");
      setSuccessMessage(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <div>
      Forgot Password
      {JSON.stringify(successMessage)}
      <form onSubmit={handleSubmit}>
        <label>Enter email</label>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
