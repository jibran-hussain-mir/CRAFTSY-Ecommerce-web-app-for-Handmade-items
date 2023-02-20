import React from "react";
import { NavLink } from "react-router-dom";
import "./css/Header.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsCartPlusFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { signout, isAuthenticated } from "../auth/index";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [name, setName] = useState("nav-links");

  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="logo">
          <h1>Craftsy</h1>
        </div>
        <div>
          <input type="text" />
        </div>
        <nav className={name}>
          <ul className="nav-ul">
            <li onClick={() => setName("nav-links")}>
              <NavLink to="/about" className="NavLinks">
                About Us
              </NavLink>
            </li>
            <li onClick={() => setName("nav-links")}>
              <NavLink to="/profile" className="NavLinks">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="NavLinks">
                <BsCartPlusFill
                  size={20}
                  onClick={() => setName("nav-links")}
                />{" "}
                <span>2</span>
              </NavLink>
            </li>
            {!isAuthenticated() && (
              <>
                <li onClick={() => setName("nav-links")}>
                  <NavLink to="/signup" className="NavLinks">
                    Signup
                  </NavLink>
                </li>
                <li onClick={() => setName("nav-links")}>
                  <NavLink to="/signin" className="NavLinks">
                    Signin
                  </NavLink>
                </li>
              </>
            )}
            {isAuthenticated() && (
              <>
                <li
                  onClick={() => setName("nav-links")}
                  style={{ cursor: "pointer" }}
                >
                  <span
                    className="NavLinks"
                    onClick={() => {
                      signout(() => navigate("/"));
                    }}
                  >
                    Signout
                  </span>
                </li>
                <li onClick={() => setName("nav-links")}>
                  {isAuthenticated().user.role === 1 && (
                    <NavLink to="/admin/dashboard" className="NavLinks">
                      Dashboard
                    </NavLink>
                  )}
                  {isAuthenticated().user.role === 0 && (
                    <NavLink to="/user/dashboard" className="NavLinks">
                      Dashboard
                    </NavLink>
                  )}
                </li>
              </>
            )}
          </ul>
          <RxCross2
            className="menu-icon close"
            onClick={() => setName("nav-links")}
          />
        </nav>
        <GiHamburgerMenu
          className="menu-icon"
          size={50}
          onClick={() => setName("nav-links responsive")}
        />
      </header>
    </>
  );
};

export default Header;
