export async function getProducts(sortBy) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/products?sortBy=sold&order=desc&limit=12`,
      {
        method: "POST",
      }
    );
    return response.json();
  } catch (e) {
    return console.log(e);
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/categories`,
      {
        method: "GET",
      }
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

export async function getClientToken(userId, token) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/braintree/getToken/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function processPayment(userId, token, paymentData) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/braintree/payment/${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      }
    );
    console.log(`Kahan pe hai error`);
    // Read the response data once

    // console.log(`apiCore : ${responseD a}`);
    const responseData = await response.json();
    console.log(responseData);

    return responseData; // returns Transaction id
    // return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function createOrder(userId, token, orderedProducts) {
  try {
    console.log(`Bye world`, orderedProducts);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/order/create/${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order: orderedProducts }),
      }
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

export async function getFilteredProducts(skip, limit, filters = {}) {
  try {
    const data = {
      limit,
      skip,
      filters,
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/products/by/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}
