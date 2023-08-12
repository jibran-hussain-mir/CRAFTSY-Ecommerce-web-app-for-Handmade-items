import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";
import { isAuthenticated } from "../auth";

const Profile = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
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
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Data Subitted Successfully`);
    update(userId, token, { name, email, password }).then((data) => {
      if (data.error) {
        console.log(data);
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
  useEffect(() => {
    if (success) {
      navigate("/cart");
    }
  }, [success, navigate]);
  return (
    <div>
      <h1>Profile Section</h1>
      {JSON.stringify(values)}
      <form>
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
        <button onClick={handleSubmit}>Update Details</button>
      </form>
    </div>
  );
};

export default Profile;
