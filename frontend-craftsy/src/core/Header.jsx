import React from "react";
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

const Header = () => {
  const [name, setName] = useState("nav-links");

  const navigate = useNavigate();

  return (
    <>
      <header>
        {/* Logo */}
        <div className="logo-container">
         <NavLink to="/"><h1 className="logo-name">Craftsy</h1></NavLink>
        </div>
        {/* Search Bar */}
        <div className="sb-cont hidden">
          <input type="text" className="searchbar" />
          <button className="search-btn"><BiSearch size={23}/></button>
        </div>
        {/* Links */}
        <nav className={name}>
          <ul className="nav-ul">
            {!isAuthenticated() && (
              <>
              <li onClick={() => setName("nav-links")}>
                  <NavLink to="/"  style={({ isActive }) => 
                      (isActive ? {color: '#7400e7'} : {color: 'black'})}  className="NavLinks">
                   HOME
                  </NavLink>
                </li>
                <li onClick={() => setName("nav-links")}>
                  <NavLink to="/signup" style={({ isActive }) => 
                      (isActive ? {color: '#7400e7'} : {color: 'black'})} className="NavLinks">
                    SIGN-UP
                  </NavLink>
                </li>
                <li onClick={() => setName("nav-links")}>
                  <NavLink to="/signin" style={({ isActive }) => 
                      (isActive ? {color: '#7400e7'} : {color: 'black'})} className="NavLinks">
                    SIGN-IN
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
                    <NavLink to="/admin/dashboard" style={({ isActive }) => 
                    (isActive ? {color: '#7400e7'} : {color: 'black'})} className="NavLinks">
                      Dashboard
                    </NavLink>
                  )}
                  {isAuthenticated().user.role === 0 && (
                    <NavLink to="/user/dashboard" style={({ isActive }) => 
                    (isActive ? {color: '#7400e7'} : {color: 'black'})} className="NavLinks">
                      Dashboard
                    </NavLink>
                  )}
                </li>
              </>
            )}
      

            <li onClick={() => setName("nav-links")}>
              <NavLink to="/profile" style={({ isActive }) => 
                      (isActive ? {color: '#7400e7'} : {color: 'black'})} className="NavLinks">
                PROFILE
              </NavLink>
            </li>
            <li onClick={() => setName("nav-links")}>
              <NavLink to="/about" style={({ isActive }) => 
                      (isActive ? {color: '#7400e7'} : {color: 'black'})} className="NavLinks">
                ABOUT US
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" style={({ isActive }) => 
                      (isActive ? {color: '#7400e7'} : {color: 'black'})} className="NavLinks">
                <Badge badgeContent={4} color="primary">
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
