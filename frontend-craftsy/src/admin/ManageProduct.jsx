import React, { useEffect, useState } from "react";
import "./css/ManageProduct.css";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { deleteProduct, listProducts } from "./adminapi";

const ManageProduct = () => {
  const navigate = useNavigate();
  const userId = isAuthenticated()?.user?._id;
  const token = isAuthenticated()?.token;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const getAllProduts = async () => {
    try {
      const data = await listProducts(userId, token);
      setProducts([...data]);
    } catch (e) {
      setError(e);
    }
  };
  const destroy = async (productId) => {
    try {
      const deletedProduct = await deleteProduct(productId, userId, token);
      getAllProduts();
    } catch (e) {
      setError(e);
    }
  };
  //   const handleUpdateButton = (productId) => {
  //     navigate("/update-product");
  //   };
  useEffect(() => {
    getAllProduts();
  }, []);

  return (
    <div class="middle">
      <div className="table-container">
        <h1 className="everyheading">Manage Products</h1>
        <table className="tablex">
          <thead>
            <th>Product Id</th>

            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Update</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td data-label={"Id"}>{product._id}</td>
                <td data-label={"Product Name"}>{product.name}</td>
                <td data-label={"Description"}>{product.description}</td>
                <td data-label={"Price"}>{product.price}</td>
                <td data-label={"Quantity"}>{product.quantity}</td>

                <td data-label={"Update"}>
                  <button
                    className="upd-del-btns"
                    onClick={() =>
                      navigate(`/admin/dashboard/update-product/${product._id}`)
                    }
                  >
                    Update
                  </button>
                </td>
                <td data-label={"Delete"}>
                  <button
                    className="upd-del-btns red"
                    onClick={() => {
                      destroy(product._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
