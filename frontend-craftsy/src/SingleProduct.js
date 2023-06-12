import React from "react";
import "./user/css/SingleProduct.css";
import img1 from "../src/assets/img1.jpg";
import img2 from "../src/assets/img2.jpg";
import img3 from "../src/assets/img3.jpg";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbReplaceFilled } from "react-icons/tb";
import { FaRupeeSign } from "react-icons/fa";
import { BsFillShieldFill } from "react-icons/bs";
import { useState } from "react";

function SingleProduct() {
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    setAmount(amount + 1);
  };

  const [changedimg, setChangedimg] = useState("img1");
  return (
    <>
      <div className="containerx">
        <div className="image-section">
          <div className="product-image">
            <img className="active-img" src={changedimg} alt="xz" />
          </div>
          <div className="imgs3">
            <ul class="image-list">
              <li className="image-item">
                <img
                  className="image-i"
                  src={img1}
                  alt="xz"
                  onClick={() => setChangedimg(img1)}
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
          <h1 className="main-name">Handmade Bag by Gucci</h1>
          <h2 className="main-price">$189.99</h2>
          <hr className="hrule1" />
          <div className="description2">
            <p className="paras">
              The purposes of bonsai are primarily contemplation for the viewer,
              and the pleasant exercise of effort and ingenuity for the grower.
            </p>
            <p className="paras">
              By contrast with other plant cultivation practices, bonsai is not
              intended for production of food or for medicine. Instead, bonsai
              practice focuses on long-term cultivation and shaping of one or
              more small trees growing in a container.
            </p>
          </div>
          <div className="twobtns">
            <div className="amountToggle">
              <button onClick={() => setDecrease()} className="toggle-btns">
                <FaMinus size={15} className="toggleicons" />
              </button>
              <div className="amt-style">{amount}</div>
              <button n onClick={() => setIncrease()} className="toggle-btns">
                <FaPlus size={15} className="toggleicons" />
              </button>
            </div>
            <div>
              <button className="add-to-cart-btn">Add To Cart</button>
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
  );
}

export default SingleProduct;
