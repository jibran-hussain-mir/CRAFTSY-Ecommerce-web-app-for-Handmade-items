exports.createCategory = async (user_id, token, category) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/category/create/${user_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: category,
      }
    );
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

exports.createProduct = async (user_id, token, product) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/product/create/${user_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: product,
      }
    );
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

exports.fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:8000/categories", {
      method: "GET",
      headers: {},
    });
    return response.json();
  } catch (e) {
    return console.log(e);
  }
};

exports.listOrders = async (userId, token) => {
  try {
    const orders = await fetch(
      `http://localhost:8000/api/order/list/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return orders.json();
  } catch (e) {
    console.log(e);
    return e;
  }
};

exports.getProducts = async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/products`, {
      method: "GET",
    });
    return response.json();
  } catch (e) {
    return console.log(e);
  }
};

exports.deleteProduct = async (productId, userId, token) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/product/${productId}/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

exports.getProduct = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/product/${productId}`,
      {
        method: "GET",
      }
    );
    return response.json();
  } catch (e) {}
};
exports.updateProduct = async (productId, userId, token, product) => {
  try {
    console.log(product);
    const response = await fetch(
      `http://localhost:8000/api/product/${productId}/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: product,
      }
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
};
// Fetch all products of a particular admin
exports.listProducts = async (userId, token) => {
  try {
    const products = await fetch(
      `http://localhost:8000/api/list-products/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return products.json();
  } catch (e) {
    console.log(e);
  }
};

exports.getStatusValues = async (userId, token) => {
  try {
    const statusValues = await fetch(
      `http://localhost:8000/api/order/status-values/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return statusValues.json();
  } catch (e) {
    console.log(e);
  }
};

exports.updateOrderStatus = async (
  userId,
  token,
  orderId,
  productId,
  status
) => {
  try {
    console.log(productId);
    const statusValues = await fetch(
      `http://localhost:8000/api/order/${orderId}/status/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, orderId, productId }),
      }
    );
    return statusValues.json();
  } catch (e) {
    console.log(e);
  }
};

exports.getOrderStatus = async (userId, token) => {
  try {
    const statusValues = await fetch(
      `http://localhost:8000/api/order/status-values/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return statusValues.json();
  } catch (e) {
    console.log(e);
  }
};
