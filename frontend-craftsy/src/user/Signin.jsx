import React, { useState } from "react";
import { signin } from "../auth/index";
import { authenticate, isAuthenticated } from "../auth/index";
import Header from "../core/Header";
import { Navigate } from "react-router-dom";

const Signin = (userCredentials) => {
  const [userSignin, setUserSignin] = useState({
    email: "mirjibranhussain@gmail.com",
    password: "jibran",
    error: "",
    loading: false,
    redirectToReferer: false,
  });

  const { user } = isAuthenticated();

  const handleChange = (event) => {
    const input = event.target.name;
    const value = event.target.value;
    setUserSignin({ ...userSignin, [input]: value });
  };

  const redirectToReferer = () => {
    if (userSignin.redirectToReferer) {
      if (user && user.role === 0) return <Navigate to="/user/dashboard" />;
      else return <Navigate to="/admin/dashboard" />;
    }
    // if (isAuthenticated()) return <Navigate to="/about" />;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserSignin({ ...userSignin, error: "", loading: true });
    const { email, password } = userSignin;
    signin({ email, password }).then((res) => {
      if (res.error) {
        setUserSignin({
          ...userSignin,
          email: "",
          password: "",
          error: res.error,
          loading: false,
        });
      } else {
        authenticate(res, () => {
          setUserSignin({
            ...userSignin,
            email: "",
            password: "",
            error: "",
            redirectToReferer: true,
          });
        });
      }
    });
  };

  return (
    <>
      {redirectToReferer()}
      <div>
        {/* If any error occured */}
        {userSignin.error && (
          <div>
            <h3>{userSignin.error}</h3>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            autoComplete="off"
            value={userSignin.email}
            name="email"
            placeholder="Your email"
            id="email"
            onChange={handleChange}
          ></input>
          <br />
          <br />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="off"
            value={userSignin.password}
            name="password"
            placeholder="Your password"
            id="password"
            onChange={handleChange}
          ></input>
          <br />

          <button>Login</button>
          {userSignin.loading && (
            <div>
              <h1>Loading....</h1>
            </div>
          )}
        </form>
        Error : {userSignin.error}
        <br />
        <h1>
          Email: {userSignin.email},Password: {userSignin.password}
        </h1>
        <h1>{JSON.stringify(userSignin)}</h1>
      </div>
    </>
  );
};

export default Signin;
