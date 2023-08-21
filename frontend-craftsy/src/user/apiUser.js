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

exports.forgotPassword = async (email) => {
  try {
    console.log("hi");
    console.log(email);
    const response = await fetch(`http://localhost:8000/api/reset-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

exports.resetPassword = async (id, token, newPassword) => {
  try {
    console.log(`dkkkkkkkkkkjjjj: ${newPassword}`);
    const response = await fetch(
      `http://localhost:8000/api/reset-password/${id}/${token}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      }
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
};
