import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getProduct, fetchCategories, updateProduct } from "./adminapi";
import "./css/AddProduct.css";
import SuccessMessage from "../Notifications/SuccessMessage";
import ErrorMessage from "../Notifications/ErrorMessage";

const UpdateProduct = () => {
  const { productId } = useParams();
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: "",
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    success: false,
    createdProduct: false,
    redirectToProfile: false,
  });

  const {
    name,
    description,
    price,
    category,
    categories,
    shipping,
    quantity,
    error,
  } = values;

  const getSingleProduct = async () => {
    try {
      const data = await getProduct(productId);
      const { product } = data;

      setValues({
        ...values,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        quantity: product.quantity,
        shipping: product.shipping,
      });
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ categories: data, error: "" });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const handleChange = (event) => {
    const target = event.target.name;
    const value =
      target === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [target]: value, success: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    const productData = {
      name,
      description,
      price,
      category,
      shipping,
      quantity,
      photo: values.photo, // This should be the File object if uploading an image
    };

    updateProduct(productId, user._id, token, productData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          console.log(data);
          setValues({
            ...values,
            error: "",
            loading: false,
            success: true,
            createdProduct: data.name,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  // const showError = () => (
  //   <div style={{ display: error ? "" : "none" }}>{error}</div>
  // );

  const showSuccess = () => {
    if (values.success) {
      return (
        <div>
          <SuccessMessage message="Product Updated Successfully" />
        </div>
      );
    }
  };

  const showError = () => {
    if (values.error) {
      return (
        <div>
          <ErrorMessage message={values.error} />
        </div>
      );
    }
  };
  return (
    <>
      {showSuccess()}
      {showError()}
      <div className="custom-form-container">
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
              <button className="custom-submit-button">Update Product</button>
            </div>
          </form>
          {showError()}
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
