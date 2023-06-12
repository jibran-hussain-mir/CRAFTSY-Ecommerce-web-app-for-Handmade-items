import React from "react";
import { NavLink } from "react-router-dom";
import "./css/Header.css";
import { GiHamburgerMenu } from "react-icons/gi";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { signout, isAuthenticated } from "../auth/index";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  const [name, setName] = useState("nav-links");

  const navigate = useNavigate();

  return (
    <>
      <header>
        {/* Logo */}
        <div className="logo-container">
          <h1 className="logo">Craftsy</h1>
        </div>
        {/* Search Bar */}
        <div>
          <input type="text" />
        </div>
        {/* Links */}
        <nav className={name}>
          <ul className="nav-ul">
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
            <li>
              <NavLink to="/cart" className="NavLinks">
                <Badge badgeContent={4} color="primary">
                  <ShoppingCartOutlinedIcon
                    sx={{ fontSize: 22 }}
                    onClick={() => setName("nav-links")}
                  />
                </Badge>
              </NavLink>
            </li>

            <li onClick={() => setName("nav-links")}>
              <NavLink to="/profile" className="NavLinks">
                Profile
              </NavLink>
            </li>
            <li onClick={() => setName("nav-links")}>
              <NavLink to="/about" className="NavLinks">
                About Us
              </NavLink>
            </li>
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
