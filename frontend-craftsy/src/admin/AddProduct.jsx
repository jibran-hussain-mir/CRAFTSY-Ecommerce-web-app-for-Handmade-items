import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { createProduct, fetchCategories } from "./adminapi";
import "./css/AddProduct.css";

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
        setValues({ ...values, categories: data });
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
    setValues({ ...values, [target]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: " ", loading: true });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          console.log(data);
          setValues({
            ...values,
            error: "",
            loading: false,
            createdProduct: data.name,
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

  const showError = () => (
    <div style={{ display: error ? "" : "none" }}>{error}</div>
  );

  const showSuccess = () => {
    if (createdProduct) {
      return <h2>{createProduct}</h2>;
    }
  };
  return (
    <>
      {/* new form */}
      <div className="container">
        <div className="title">Add Product</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Product Name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Product Name"
                />
              </div>

              <div className="input-box">
                <span className="details">Description of Product</span>
                <textarea
                  type="text"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </div>

              <div className="input-box">
                <span className="details">Price</span>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleChange}
                  placeholder="Price"
                />
              </div>

              <div className="input-box">
                <span className="details">Select Category</span>
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

              <div className="input-box">
                <span className="details">Shipping</span>
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

              <div className="input-box">
                <span className="details">Quantity</span>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                />
              </div>
              <div className="input-box">
                <span className="details">Price</span>
                <input type="file" name="photo" onChange={handleChange} />
              </div>
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
