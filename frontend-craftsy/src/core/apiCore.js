exports.getProducts = async (sortBy) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/products?sortBy=sold&order=desc&limit=10`,
      {
        method: "POST",
      }
    );
    return response.json();
  } catch (e) {
    return console.log(e);
  }
};

exports.fetchCategories = async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/categories`, {
      method: "GET",
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

exports.getClientToken = async (userId, token) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/braintree/getToken/${userId}`,
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
};

exports.processPayment = async (userId, token, paymentData) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/braintree/payment/${userId}`,
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
};

exports.createOrder = async (userId, token, orderedProducts) => {
  try {
    console.log(`Bye world`);
    const response = await fetch(
      `http://localhost:8000/api/order/create/${userId}`,
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
};
