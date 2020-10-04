import React from "react";
import logo from "../../icons/lg-sl-icon.png";

// import smLogo from '../../icons/sm-sl-icon.png'
// export function SLLogoLg() {
//   return (<img className='sm-logo' src={smLogo} alt='Stronklifts Logo'/>);
// }

export default function SLLogo() {
  return (
    <img
      className="lg-logo"
      src={logo}
      alt="Stronklifts Logo"
    />
  );
}
