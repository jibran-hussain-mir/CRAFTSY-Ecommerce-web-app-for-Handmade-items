export async function createCategory(user_id, token, category) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/category/create/${user_id}`,
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
}

export async function createProduct(user_id, token, product) {
  try {
    console.log(product);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/product/create/${user_id}`,
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
}

export async function fetchCategories() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/categories`,
      {
        method: "GET",
        headers: {},
      }
    );
    return response.json();
  } catch (e) {
    return console.log(e);
  }
}

export async function listOrders(userId, token) {
  try {
    const orders = await fetch(
      `${process.env.REACT_APP_API_URL}/order/list/${userId}`,
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
}

export async function getProducts() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: "GET",
    });
    return response.json();
  } catch (e) {
    return console.log(e);
  }
}

export async function deleteProduct(productId, userId, token) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/product/${productId}/${userId}`,
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
}

export async function getProduct(productId) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/product/${productId}`,
      {
        method: "GET",
      }
    );
    return response.json();
  } catch (e) {}
}
export async function updateProduct(productId, userId, token, product) {
  try {
    console.log("Hi Jibran, I am in the admin api", product);
    console.log(product);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/product/${productId}/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      }
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
}
// Fetch all products of a particular admin
export async function listProducts(userId, token) {
  try {
    const products = await fetch(
      `${process.env.REACT_APP_API_URL}/list-products/${userId}`,
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
}

export async function getStatusValues(userId, token) {
  try {
    const statusValues = await fetch(
      `${process.env.REACT_APP_API_URL}/order/status-values/${userId}`,
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
}

export async function updateOrderStatus(
  userId,
  token,
  orderId,
  productId,
  status
) {
  try {
    console.log(productId);
    const statusValues = await fetch(
      `${process.env.REACT_APP_API_URL}/order/${orderId}/status/${userId}`,
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
}

export async function getOrderStatus(userId, token) {
  try {
    const statusValues = await fetch(
      `${process.env.REACT_APP_API_URL}/order/status-values/${userId}`,
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
}

export async function generateOTP() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/generateOTP`,
      {
        method: "GET",
        headers: {},
      }
    );
    return response.json();
  } catch (e) {
    return e.message;
  }
}

export async function sendOTP(to, subject, message) {
  try {
    console.log("qwertyuiopoiuytrewertyuio");
    console.log(to, subject, message);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sendOTP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ to, subject, message }),
    });
    return response;
  } catch (error) {
    return console.log(error);
  }
}
