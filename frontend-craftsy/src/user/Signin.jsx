import React, { useEffect, useState } from "react";
import { signin } from "../auth/index";
import { authenticate, isAuthenticated } from "../auth/index";
import "../user/css/Signin.css";
import Header from "../core/Header";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import signinimg from "../assets/signin.jpg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Signin = (userCredentials) => {
  const [userSignin, setUserSignin] = useState({
    email: "",
    password: "",
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
    signin({ email, password })
      .then((res) => {
        if (res.error) {
          setUserSignin({
            ...userSignin,
            email: "",
            password: "",
            error: res.error,
            loading: false,
          });
          console.log(userSignin.error);
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
      })
      .catch((error) => console.log(`here is the ${error}`));
  };

  const showError = () => (
    <div
      className="signin-error-text"
      style={{ display: userSignin.error ? "" : "none" }}
    >
      <p>{userSignin.error}</p>
    </div>
  );

  return (
    <div className="main-cont">
      <div className="img-cont hidden">
        <img src={signinimg} alt="qll" className="signup-image" />
      </div>
      <div>
        <div className="form-cont">
          <div className="form">
            <div className="sign-in-section">
              <h1 className="h1-login">LOG IN</h1>
              <NavLink to="/signup" className="NavLinks">
                <h6 className="addH4">
                  <span>
                    <AiOutlineUserAdd size={18} className="addSvg" />
                  </span>
                  Don't have an account?
                </h6>
              </NavLink>
              {showError()}

              <form onSubmit={handleSubmit} className="form">
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    autoComplete="off"
                    value={userSignin.email}
                    name="email"
                    id="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    value={userSignin.password}
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-options">
                  <a href="forgot-password">Forgot Password?</a>
                </div>
                <div className="form-field">
                  <button className="btn btn-signin">
                    {userSignin.loading ? (
                      <div className="loading-contianer">
                        <div>
                          <AiOutlineLoading3Quarters className="loading-icon" />
                        </div>
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {redirectToReferer()}
    </div>
  );
};

export default Signin;

///
