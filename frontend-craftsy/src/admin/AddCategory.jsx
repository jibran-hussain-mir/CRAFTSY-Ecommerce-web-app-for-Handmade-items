import React, { useState } from "react";
import "./css/AddCategory.css";
import { isAuthenticated } from "../auth";
import { createCategory } from "./adminapi";
import SuccessMessage from "../Notifications/SuccessMessage";
import ErrorMessage from "../Notifications/ErrorMessage";
const AddCategory = () => {
  const [values, setValues] = useState({
    name: "",
    photo: "",
    error: false,
    success: false,
    formData: new FormData(),
  });

  const { name, photo, error, success, formData } = values;

  const { user, token } = isAuthenticated();
  console.log(`This is user : ${user}`);

  const handleChange = (event) => {
    const target = event.target.name;
    const value =
      target === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, error: false, success: false, [target]: value });

    formData.set([target], value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", success: false });
    createCategory(user._id, token, formData)
      .then((data) => {
        if (data?.error) {
          console.log(data.error);
          setValues({ ...values, success: false, error: data.error });
        } else {
          setValues({ ...values, error: false, success: true });
        }
      })
      .catch((error) => console.log(error));
  };

  const successMessage = () => {
    if (success) {
      return (
        <div>
          <SuccessMessage message="Category Added Successfully" />
        </div>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <div>
          <ErrorMessage message={error} />
        </div>
      );
    }
  };

  const newCategoryForm = () => (
    <form className="category-form" onSubmit={handleSubmit}>
      <label className="category-label" htmlFor="category">
        Category Name
      </label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        id="category"
        className="category-input"
        placeholder="Enter category name"
      />
      <label className="photo-label" htmlFor="photo">
        Category Photo
      </label>
      <input
        type="file"
        name="photo"
        onChange={handleChange}
        className="photo-input"
      />
      <button className="add-category-button">Add Category</button>
    </form>
  );
  return (
    <>
      {errorMessage()}
      {successMessage()}
      {newCategoryForm()}
    </>
  );
};

export default AddCategory;
