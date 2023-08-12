import React from "react";
import "./css/Footer.css";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";

const Footer = () => {
  return (
    <div>
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>Craftsy</h2>
          </div>
          <div className="footer-links">
            <ul>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
              <li>
                <a href="/">Services</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Craftsy by Jibran and Fahad. All
            rights reserved.
          </p>
          <div className="footer-logos">
            <div className="footer-links">
              <ul>
                <li>
                  <a href="/">
                    <AiOutlineWhatsApp size={40} />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <AiFillLinkedin size={40} />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <AiFillGithub size={40} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
