export async function read(userId, token) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/${userId}`,
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
}

export async function update(userId, token, user) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      }
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

export function updateUser(user, next) {
  if (localStorage.getItem("jwt")) {
    const auth = JSON.parse(localStorage.getItem("jwt"));
    auth.user = user;
    localStorage.setItem("jwt", JSON.stringify(auth));
    next();
  }
}

export async function getPurchaseHistory(userId, token) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/orders/by/user/${userId}`,
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
}

export async function forgotPassword(email) {
  try {
    console.log("hi");
    console.log(email);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/reset-password`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

export async function resetPassword(id, token, newPassword) {
  try {
    console.log(`dkkkkkkkkkkjjjj: ${newPassword}`);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/reset-password/${id}/${token}`,
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
}
