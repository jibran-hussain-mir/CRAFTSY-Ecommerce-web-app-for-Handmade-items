import React, { useEffect } from "react";
import "./user/css/SingleProduct.css";
import img1 from "../src/assets/img1.jpg";
import img2 from "../src/assets/img2.jpg";
import img3 from "../src/assets/img3.jpg";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbReplaceFilled } from "react-icons/tb";
import { FaRupeeSign } from "react-icons/fa";
import { BsFillShieldFill } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useContext } from "react";
import { ProductContext } from "./Context/ProductProvider.js";
import { CartContext } from "./Context/CartProvider.jsx";

const SingleProduct = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);

  const { isSingleLoading, singleProduct, isError, getSingleProduct } =
    useContext(ProductContext);
  const { product } = singleProduct;
  console.log(product);

  const { addToCart } = useContext(CartContext);

  // const { id, name, price, quantity, addToCart } = useContext(CartContext);

  useEffect(() => {
    getSingleProduct(params.id);
  }, []);

  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };
  const imageURL = `${process.env.REACT_APP_API_URL}/product/photo/${product?._id}`;

  useEffect(() => {
    if (product);
    setChangedimg(imageURL);
  }, [product]);

  const setIncrease = () => {
    setAmount(amount + 1);
  };

  const [changedimg, setChangedimg] = useState("");
  return (
    <>
      {isSingleLoading ? (
        <div className="loading-contianer-single">
          <AiOutlineLoading3Quarters
            className="loading-icon-single"
            size={55}
          />
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          {" "}
          <div className="containerx">
            <div className="image-section">
              <div className="product-image">
                <img className="active-img" src={changedimg} alt="xz" />
              </div>
              <div className="imgs3">
                <ul className="image-list">
                  <li className="image-item">
                    <img
                      className="image-i"
                      src={imageURL}
                      alt="xz"
                      onClick={() => setChangedimg(imageURL)}
                    />
                  </li>
                  <li className="image-item">
                    <img
                      className="image-i "
                      src={img2}
                      alt="xz"
                      onClick={() => setChangedimg(img2)}
                    />
                  </li>
                  <li className="image-item">
                    <img
                      className="image-i"
                      src={img3}
                      alt="xz"
                      onClick={() => setChangedimg(img3)}
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="description">
              <h1 className="main-name">{product?.name}</h1>
              <h2 className="main-price">Rs. {product?.price}</h2>
              <hr className="hrule1" />
              <div className="description2">
                <p className="paras">{product?.description}</p>
              </div>
              <h4>Only {product?.quantity} left in the stock</h4>
              <div className="twobtns">
                <div className="amountToggle">
                  <button
                    onClick={() => (amount > 1 ? setDecrease() : null)}
                    className="toggle-btns"
                  >
                    <FaMinus size={15} className="toggleicons" />
                  </button>
                  <div className="amt-style">{amount}</div>
                  <button
                    onClick={() =>
                      amount < product?.quantity ? setIncrease() : null
                    }
                    className="toggle-btns"
                  >
                    <FaPlus size={15} className="toggleicons" />
                  </button>
                </div>
                <div>
                  <NavLink to="/cart">
                    <button
                      onClick={() => {
                        addToCart(
                          product?._id,
                          product?.name,
                          product?.price,
                          product?.createdBy,
                          amount,
                          product
                        );
                      }}
                      className="add-to-cart-btn"
                    >
                      Add To Cart
                    </button>
                  </NavLink>
                </div>
              </div>
              <hr className="mid-hr" />
              <div className="d-icons">
                <div className="d-divs">
                  <BsFillShieldFill className="d-icon" size={24} />
                  <span>10 Year Warranty</span>
                </div>
                <div className="d-divs">
                  <FaRupeeSign className="d-icon" size={24} />
                  <span>Money Back Gurantee</span>
                </div>
                <div className="d-divs">
                  <CiDeliveryTruck className="d-icon" size={24} />
                  <span>Craftsy Deliver</span>
                </div>
                <div className="d-divs">
                  <TbReplaceFilled className="d-icon" size={24} />
                  <span>30 days replacement</span>
                </div>
              </div>
            </div>
          </div>
          <div className="related-products">
            <div className="related-heading">
              <h3 className="r-h3">
                You may also like{" "}
                <span>
                  <hr className="end-hr" />
                </span>
              </h3>
            </div>
            <div className="grid-columns">
              <div>
                <img className="r-imgs" src={img1} alt="xz" />
                <h4 className="r-h4">Succulent</h4>
                <p className="price-h4">$19.99</p>
              </div>
              <div className="columns">
                <img className="r-imgs" src={img2} alt="xz" />
                <h4 className="r-h4">Terranium</h4>
                <p className="price-h4">$19.99</p>
              </div>
              <div className="columns">
                <img className="r-imgs" src={img3} alt="xz" />
                <h4 className="r-h4">Cactus</h4>
                <p className="price-h4">$19.99</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleProduct;
