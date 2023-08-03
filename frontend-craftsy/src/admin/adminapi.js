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
