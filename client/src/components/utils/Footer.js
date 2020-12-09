import React from "react";
import "./Footer.css";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import {linkedin} from "@fortawesome/free-brands-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fab);

export default function Footer() {
  return (
    <div className='footer'>
			<a
        href="https://www.isaacfinken.dev/"
        title="About Me"
				target="_blank"
				rel="noopener noreferrer"
				className="footer-icon"
				style={{"fontSize":"3vw"}}
      >
        About Me
      </a>
      <a
        href="https://www.linkedin.com/in/isaac-finken/"
        title="LinkedIn"
				target="_blank"
				rel="noopener noreferrer"
        className="footer-icon"
      >
        <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
      </a>
      <a
        href="https://angel.co/u/isaac-finken"
        title="AngelList"
				target="_blank"
				rel="noopener noreferrer"
        className="footer-icon"
      >
        <FontAwesomeIcon icon={["fab", "angellist"]} />
      </a>
      <a
        href="https://github.com/icey-franken/stronklifts"
        title="GitHub"
				target="_blank"
				rel="noopener noreferrer"
        className="footer-icon"
      >
        <FontAwesomeIcon icon={["fab", "github"]} />
      </a>
      <a
        href="https://www.facebook.com/isaac.finken/"
        title="Facebook"
				target="_blank"
				rel="noopener noreferrer"
        className="footer-icon"
      >
        <FontAwesomeIcon icon={["fab", "facebook-f"]} />
      </a>
      <a
        href="https://www.instagram.com/icey_franken/"
        title="Instagram"
				target="_blank"
				rel="noopener noreferrer"
        className="footer-icon"
      >
        <FontAwesomeIcon icon={["fab", "instagram"]} />
      </a>
    </div>
  );
}
