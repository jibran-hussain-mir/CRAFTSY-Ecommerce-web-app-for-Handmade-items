import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";
import { isAuthenticated } from "../auth";
import "./css/Profile.css";
import SuccessMessage from "../Notifications/SuccessMessage";
import ErrorMessage from "../Notifications/ErrorMessage";

const Profile = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const { name, email, password, error, success } = values;
  const userId = isAuthenticated()?.user?._id;
  const token = isAuthenticated()?.token;
  const getUserDetails = () => {
    read(userId, token)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
          });
        }
      })
      .catch((e) => console.log(e));
  };
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      success: false,
      error: false,
      [name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Data Subitted Successfully`);
    update(userId, token, { name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            success: true,
          });
        });
      }
    });
  };
  const navigate = useNavigate();

  const profileUpdate = () => {};
  useEffect(() => {
    getUserDetails();
  }, []);
  // useEffect(() => {
  //   if (success) {
  //     setSuccessMessage("Profile Updated Successfully");
  //   }
  // }, [success, navigate]);

  const showSuccess = () => {
    if (success) {
      return (
        <div>
          <SuccessMessage message="Profile Updated Successfully" />
        </div>
      );
    }
  };
  const showError = () => {
    if (error) {
      return (
        <div>
          <ErrorMessage message={error} />
        </div>
      );
    }
  };
  return (
    <div className="profile-x-contianer">
      {showSuccess()}
      {showError()}
      <h1>Profile Section</h1>
      {/* {JSON.stringify(values)} */}
      {successMessage && (
        <div className="msg">
          <p>{successMessage}</p>
        </div>
      )}
      <form className="profile-form">
        <label>Name</label>
        <input type="text" value={name} onChange={handleChange("name")} />
        <label>Email</label>
        <input type="email" value={email} onChange={handleChange("email")} />
        <label>New Password</label>
        <input
          type="password"
          value={password}
          onChange={handleChange("password")}
        />
        <div className="profilebtncont">
          <button className="profile-x-btn" onClick={handleSubmit}>
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
