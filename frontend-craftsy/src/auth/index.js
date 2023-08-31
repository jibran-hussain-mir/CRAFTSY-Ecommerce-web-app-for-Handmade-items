export const userSignup = async (user) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return response.json();
  } catch (e) {
    console.log(e.message);
  }
};

export const signupSeller = async (user) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/seller-signup`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    return response.json();
  } catch (e) {
    console.log(e.message);
  }
};

export const signin = async (user) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return response.json();
  } catch (e) {
    console.log(e.message);
  }
};

export const authenticate = (data, callback) => {
  if (window) {
    localStorage.setItem("jwt", JSON.stringify(data));
    callback();
  }
};

export const signout = (callback) => {
  if (window) {
    localStorage.removeItem("jwt");
    fetch(`${process.env.REACT_APP_API_URL}/signout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => callback())
      .catch((e) => console.log(e));
  }
};

export const isAuthenticated = () => {
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else return false;
};
