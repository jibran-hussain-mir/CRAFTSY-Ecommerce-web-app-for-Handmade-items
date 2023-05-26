import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import { createCategory } from "./adminapi";
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
    setValues({ ...values, [target]: value });
    formData.set([target], value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", success: false });
    createCategory(user._id, token, formData)
      .then((data) => {
        if (data?.error) {
          console.log(data.error);
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: "", success: true });
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
      <input type="file" name="photo" onChange={handleChange} />
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
