exports.read = async (userId, token) => {
  try {
    const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (e) {
    console.log(e.message);
  }
};

exports.update = async (userId, token, user) => {
  try {
    const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

exports.updateUser = (user, next) => {
  if (localStorage.getItem("jwt")) {
    const auth = JSON.parse(localStorage.getItem("jwt"));
    auth.user = user;
    localStorage.setItem("jwt", JSON.stringify(auth));
    next();
  }
};

exports.getPurchaseHistory = async (userId, token) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/orders/by/user/${userId}`,
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
  } catch (e) {
    console.log(e.message);
  }
};
