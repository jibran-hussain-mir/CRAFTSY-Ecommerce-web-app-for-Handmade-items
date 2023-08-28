import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { createProduct, fetchCategories } from "./adminapi";
import "./css/AddProduct.css";
import SuccessMessage from "../Notifications/SuccessMessage";
import ErrorMessage from "../Notifications/ErrorMessage";
const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    categories: [],
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: false,
    redirectToProfile: "false",
    formData: new FormData(),
  });

  const {
    name,
    description,
    price,
    category,
    categories,
    shipping,
    quantity,
    photo,
    error,
    createdProduct,
    formData,
  } = values;

  const getCategories = () => {
    fetchCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: false, categories: data });
      }
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (event) => {
    const target = event.target.name;
    const value =
      target === "photo" ? event.target.files[0] : event.target.value;
    formData.set(target, value);
    setValues({ ...values, error: false, [target]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          console.log(data);
          setValues({
            name: "",
            description: "",
            price: "",
            category: "",
            shipping: "",
            quantity: "",
            photo: " ",
            error: "",
            loading: false,
            createdProduct: true,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const isLoading = () => {
    if (values.loading === true) {
      return <h1>Loading... </h1>;
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

  const showSuccess = () => {
    if (createdProduct) {
      return (
        <div>
          {" "}
          <SuccessMessage message="Product Created Successfully" />
        </div>
      );
    }
  };
  return (
    <>
      {showError()}
      {showSuccess()}
      <div className="custom-form-container">
        {/* <div className="custom-form-title">Add Product</div> */}
        <div className="custom-content">
          <form onSubmit={handleSubmit}>
            <div className="custom-user-details">
              <div className="custom-input-box">
                <span className="custom-details">Product Name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Product Name"
                />
              </div>

              <div className="custom-input-box">
                <span className="custom-details">Description of Product</span>
                <textarea
                  type="text"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </div>

              <div className="custom-input-box">
                <span className="custom-details">Price</span>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleChange}
                  placeholder="Price"
                />
              </div>

              <div className="custom-input-box">
                <span className="custom-details">Select Category</span>
                <select
                  name="category"
                  value={category}
                  onChange={handleChange}
                >
                  <option disabled>Please Select</option>
                  {categories &&
                    categories.map((category) => {
                      return (
                        <option value={category._id} key={category._id}>
                          {category.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="custom-input-box">
                <span className="custom-details">Shipping</span>
                <select
                  name="shipping"
                  value={shipping}
                  onChange={handleChange}
                >
                  <option disabled defaultValue>
                    --Select--
                  </option>
                  <option>--Select--</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="custom-input-box">
                <span className="custom-details">Quantity</span>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                />
              </div>
              <div className="custom-input-box">
                <span className="custom-details">Price</span>
                <input type="file" name="photo" onChange={handleChange} />
              </div>
              <button className="custom-submit-button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
