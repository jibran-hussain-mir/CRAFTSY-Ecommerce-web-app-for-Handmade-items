import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./css/Header.css";
import { GiHamburgerMenu } from "react-icons/gi";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { signout, isAuthenticated } from "../auth/index";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { CartContext } from "../Context/CartProvider";

const Header = () => {
  const { total_items } = useContext(CartContext);

  const [name, setName] = useState("nav-links");

  const navigate = useNavigate();

  return (
    <>
      <header>
        {/* Logo */}
        <div className="logo-container">
          <NavLink to="/">
            <h1 className="logo-name">Craftsy</h1>
          </NavLink>
        </div>
        {/* Search Bar */}
        {/* <div className="sb-cont hidden">
          <input
            type="text"
            className="searchbar"
            placeholder="   Search Products here...."
          />
          <button className="search-btn">
            <BiSearch size={23} />
          </button>
        </div> */}
        {/* Links */}
        <nav className={name}>
          <ul className="nav-ul">
            {!isAuthenticated() && (
              <>
                <li onClick={() => setName("nav-links")}>
                  <NavLink
                    to="/"
                    style={({ isActive }) =>
                      isActive ? { color: "#7400e7" } : { color: "black" }
                    }
                    className="NavLinks"
                  >
                    Home
                  </NavLink>
                </li>
                <li onClick={() => setName("nav-links")}>
                  <NavLink
                    to="/signup"
                    style={({ isActive }) =>
                      isActive ? { color: "#7400e7" } : { color: "black" }
                    }
                    className="NavLinks"
                  >
                    Signup
                  </NavLink>
                </li>
                <li onClick={() => setName("nav-links")}>
                  <NavLink
                    to="/signin"
                    style={({ isActive }) =>
                      isActive ? { color: "#7400e7" } : { color: "black" }
                    }
                    className="NavLinks"
                  >
                    Signin
                  </NavLink>
                </li>
              </>
            )}
            {/* {!isAuthenticated() && (
              <>
                <li
                  onClick={() => setName("nav-links")}
                  style={{ cursor: "pointer" }}
                >
                  <NavLink
                    to="/signin"
                    style={({ isActive }) =>
                      isActive ? { color: "#7400e7" } : { color: "black" }
                    }
                    className="NavLinks"
                  >
                    Signin
                  </NavLink>
                </li>
              </>
            )} */}
            {isAuthenticated() && (
              <>
                <li
                  onClick={() => setName("nav-links")}
                  style={{ cursor: "pointer" }}
                >
                  <a
                    className="NavLinks"
                    onClick={() => {
                      signout(() => {
                        setName("nav-links");
                        navigate("/");
                      });
                    }}
                  >
                    Signout
                  </a>
                </li>
                <li onClick={() => setName("nav-links")}>
                  {isAuthenticated().user.role === 1 && (
                    <NavLink
                      to="/admin/dashboard"
                      style={({ isActive }) =>
                        isActive ? { color: "#7400e7" } : { color: "black" }
                      }
                      className="NavLinks"
                    >
                      Dashboard
                    </NavLink>
                  )}
                  {isAuthenticated().user.role === 0 && (
                    <NavLink
                      to="/user/dashboard"
                      style={({ isActive }) =>
                        isActive ? { color: "#7400e7" } : { color: "black" }
                      }
                      className="NavLinks"
                    >
                      Dashboard
                    </NavLink>
                  )}
                </li>
              </>
            )}

            <li onClick={() => setName("nav-links")}>
              <NavLink
                to="/shop"
                style={({ isActive }) =>
                  isActive ? { color: "#7400e7" } : { color: "black" }
                }
                className="NavLinks"
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                style={({ isActive }) =>
                  isActive ? { color: "#7400e7" } : { color: "black" }
                }
                className="NavLinks"
              >
                <Badge badgeContent={total_items} color="primary">
                  <ShoppingCartOutlinedIcon
                    sx={{ fontSize: 22 }}
                    onClick={() => setName("nav-links")}
                  />
                </Badge>
              </NavLink>
            </li>
          </ul>
          <RxCross2
            className="menu-icon close"
            size={30}
            onClick={() => setName("nav-links")}
          />
        </nav>
        <GiHamburgerMenu
          className="menu-icon"
          size={30}
          onClick={() => setName("nav-links responsive")}
        />
      </header>
    </>
  );
};

export default Header;
