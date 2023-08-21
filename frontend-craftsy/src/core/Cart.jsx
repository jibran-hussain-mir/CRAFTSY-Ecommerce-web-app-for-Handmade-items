import React, { useContext, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { CartContext } from "../Context/CartProvider";
import "./css/Cart.css";
import Checkout from "./Checkout";
import CartAddedProducts from "./CartAddedProducts";

function Cart() {
  const {
    cart,
    total_items,
    total_amount,
    shipping_fee,
    addToCart,
    removeFromCart,
  } = useContext(CartContext);

  return (
    // <div className="cart-main-cont">
    //   <div className="cart-container">
    //     <div className="cart-heading">
    //       <h1 className="cart-heading-h1">Your Cart</h1>
    //     </div>
    //     <div className="cart-sub-container">
    //     <div className="respo"></div>
    //       {/* <ul className="cart-ul">
    //         <li>Item</li>
    //         <li>Price</li>
    //         <li>Quantity</li>
    //         <li>Total</li>
    //         <li>Remove</li>
    //       </ul> */}
    //     </div>

    //     <div className="productss">
    //       {cart.map((product) => {
    //         console.log(product);
    //         const { id, name, price, quantity, max } = product;
    //         console.log(product);
    //         return (
    //           <CartAddedProducts
    //             key={id}
    //             productId={id}
    //             name={name}
    //             price={price}
    //             quantity={quantity}
    //             stock={max}
    //             product_info={product}
    //           />
    //         );
    //       })}
    //     </div>
    //     <hr />
    //     <div className="total-all">
    //       <div>
    //         <h2 className="sm-box">Subtotal: {total_amount}</h2>
    //         <h2 className="sm-box">
    //           Shipping Fee:{" "}
    //           {total_amount > 200 ? 0 : total_amount != 0 ? 100 : 0}{" "}
    //         </h2>
    //         <hr />
    //         <h2 className="sm-box">
    //           Order Total:{" "}
    //           {total_amount > 200
    //             ? total_amount
    //             : total_amount == 0
    //             ? 0
    //             : total_amount + 100}{" "}
    //         </h2>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="left-side-box">
    //     <Checkout />
    //   </div>
    // </div>

    <>
      <div className="cart-heading">Your Cart</div>
      <div className="cartmaincontainer">
        <div className="productss">
          <div className="table-containerx">
            <table className="tablec">
              <thead>
                <th>Item</th>
                <th>Price</th>

                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </thead>
              <tbody>
                {cart.map((product) => {
                  console.log(product);
                  const { id, name, price, quantity, max } = product;
                  console.log(product);
                  return (
                    <CartAddedProducts
                      key={id}
                      productId={id}
                      name={name}
                      price={price}
                      quantity={quantity}
                      stock={max}
                      product_info={product}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cart-total-amount">
            <h2 className="sm-box">Subtotal: {total_amount}</h2>
            <h2 className="sm-box">
              Shipping Fee:{" "}
              {total_amount > 200 ? 0 : total_amount != 0 ? 100 : 0}{" "}
            </h2>
            <hr />
            <h2 className="sm-box">
              Order Total:{" "}
              {total_amount > 200
                ? total_amount
                : total_amount == 0
                ? 0
                : total_amount + 100}{" "}
            </h2>
          </div>
        </div>
        <div>
          <Checkout />
        </div>
      </div>
    </>
  );
}

export default Cart;
