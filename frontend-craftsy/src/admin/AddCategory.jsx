import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import { createCategory } from "./adminapi";
const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setName(event.target.value);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    console.log(typeof name);
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <label htmlFor="categroy">Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        id="category"
      />
      <button>Add Category</button>
    </form>
  );
  return (
    <>
      <h1>{error}</h1>
      <h1>{name}</h1>
      {newCategoryForm()}
    </>
  );
};

export default AddCategory;
