import React from "react";
import { NavLink } from "react-router-dom";
import LogoImage from "/Logo.svg";
import Style from "./NavBar.module.css";

const Logo: React.FC = () => {
    return (
        <div className={Style.logoContainer}>
            <NavLink to="/" className={Style.logoLink}>
                <img className={Style.logo} src={LogoImage} alt="Logo" />
            </NavLink>
        </div>
    );
};

export default Logo;
