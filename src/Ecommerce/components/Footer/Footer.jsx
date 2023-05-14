import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faTeletype } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social">
        <a href="https://twitter.com/js_anshuman" target="_blank">
          <FontAwesomeIcon className="social-icon" icon={faTwitter} />
        </a>
        <a href="https://github.com/sharma-anshuman" target="_blank">
          <FontAwesomeIcon className="social-icon" icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/anshuman17/" target="_blank">
          <FontAwesomeIcon className="social-icon" icon={faLinkedin} />
        </a>
        <a href="https://www.instagram.com/itsartisticview/" target="_blank">
          <FontAwesomeIcon className="social-icon" icon={faInstagram} />
        </a>
      </div>
      <div className="copyright">
        <p>© Copyright 2023-2024 MIT Liscence</p>
      </div>
    </footer>
  );
};

export default Footer;
