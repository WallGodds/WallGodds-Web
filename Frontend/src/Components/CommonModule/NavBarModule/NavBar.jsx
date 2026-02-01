import { NavLink } from "react-router-dom";
import Style from "./NavBar.module.css";
import ThemeToggle from "../../ThemeModule/ThemeToggle";

const NavBar = () => {
    const isDark = localStorage.getItem("theme") === "dark";

    const Logo = isDark
        ? "/WallGodds_logo_for_dark_mode.svg"
        : "/WallGodds_Logo_for_light_mode.svg";
    const Github_arrow = isDark
        ? "/Github_redirect_arrow_up_lite.svg"
        : "/Github_redirect_arrow_up_dark.svg";
    const Search = isDark ? "/Search_new_light.svg" : "/Search_new_dark.svg";

    return (
        <div className={Style.navbar}>
            <div className={Style.logo}>
                <NavLink to="/">
                    <img src={Logo} alt="WallGodds Logo" data-logo />
                </NavLink>
            </div>
            <div className={Style.navigation}>
                <ul className={Style.menu}>
                    <li>
                        <NavLink to="/gallery">Gallery</NavLink>
                    </li>
                    <li>
                        <NavLink to="/upload">Upload</NavLink>
                    </li>
                    <li>
                        <a
                            href="https://github.com/WallGodds"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={Style.github}>
                            Github
                        </a>
                        <img
                            className={Style.github_arrow}
                            src={Github_arrow}
                            alt="Github Redirect Arrow"
                            data-github-arrow
                        />
                    </li>
                </ul>
            </div>
            <div className={Style.actions}>
                <div className={Style.search}>
                    <button>
                        <img src={Search} alt="Search" data-search />
                    </button>
                </div>
                <div className={Style.profile}>
                    <NavLink to="/profile">
                        <button>Join</button>
                    </NavLink>
                </div>
                <div className={Style.theme}>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
