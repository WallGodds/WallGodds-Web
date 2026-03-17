/* eslint-disable react/display-name */
import { NavLink } from "react-router-dom";
import { createPortal } from "react-dom";
import Style from "./NavBar.module.css";
import ThemeToggle from "../../ThemeModule/ThemeToggle";
import { useState, useRef, useEffect, forwardRef } from "react";
import { useLocation } from "react-router-dom";


const NavBar = forwardRef(({ className }, ref) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const searchRef = useRef(null);

    const isDark = localStorage.getItem("theme") === "dark";

    const Logo = isDark
        ? "/WallGodds_logo_for_dark_mode.svg"
        : "/WallGodds_Logo_for_light_mode.svg";
    const Search = isDark ? "/Search_new_light.svg" : "/Search_new_dark.svg";

    const Github_arrow = isDark
        ? "/Github_redirect_arrow_up_lite.svg"
        : "/Github_redirect_arrow_up_dark.svg";
    
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
    useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
}, [])
        
    const IconLogo = "/WallGodds_Favicon.png";

    const location = useLocation();
    const isUploadPage = location.pathname.includes("upload");

    useEffect(() => {
        if (searchOpen) searchRef.current?.focus();
    }, [searchOpen]);

    useEffect(() => {
        searchRef.current?.blur();
    }, [isDark]);

    return (
         <>
        <div ref={ref} className={`${Style.navbar} ${className || ""}`}>
            <div className={Style.logo}>
  <NavLink to="/">
    <img
  src={isMobile && searchOpen ? IconLogo : Logo}
  alt="WallGodds Logo"
  data-logo
  className={isMobile && searchOpen ? Style.logoIconOnly : ""}
/>
  </NavLink>
</div>
            <nav className={Style.navigation}>
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
                            <img
                                className={Style.github_arrow}
                                src={Github_arrow}
                                alt="Arrow"
                                data-github-arrow
                            />
                        </a>
                    </li>
                </ul>
            </nav>

            <div className={Style.actions}>
                <div
                    className={`${Style.search} ${searchOpen ? Style.open : ""}`}>
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={Style.searchInput}
                    />
                    <button onClick={() => setSearchOpen(!searchOpen)}>
                        <img src={Search} alt="Search" data-search />
                    </button>
                </div>
                <div className={Style.profile}>
                    <NavLink to="/profile">
                        <button>Join</button>
                    </NavLink>
                </div>
               <button
               className={`${Style.hamburger} ${menuOpen ? Style.hamburgerActive : ""}`}
               onClick={() => {
                setSearchOpen(false);   // close search
                setMenuOpen(!menuOpen); // keep existing behavior
                 }}>
                    {menuOpen ? (
                        <svg
                            width="45"
                            height="43"
                            viewBox="0 0 45 43"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <rect
                                    className={Style.hamburgerBg}
                                    width="45"
                                    height="43"
                                    rx="10"
                                />
                                <path
                                    className={Style.hamburgerLines}
                                    d="M13 15.5H27"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    className={Style.hamburgerLines}
                                    d="M13 21.5H23"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    className={Style.hamburgerLines}
                                    d="M13 27.5H27"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    className={Style.hamburgerLines}
                                    d="M31 17.5L29.8462 18.3765C27.9487 19.818 27 20.5388 27 21.5C27 22.4612 27.9487 23.182 29.8462 24.6235L31 25.5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                    ) : (
                        <svg
                            width="45"
                            height="43"
                            viewBox="0 0 45 43"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <rect
                                className={Style.hamburgerBg}
                                width="45"
                                height="43"
                                rx="10"
                                fill="white"
                            />
                            <path
                                className={Style.hamburgerLines}
                                d="M14 14.5L30 14.5"
                                stroke="#141B34"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                className={Style.hamburgerLines}
                                d="M14 21.5L30 21.5"
                                stroke="#141B34"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                className={Style.hamburgerLines}
                                d="M14 28.5L30 28.5"
                                stroke="#141B34"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <defs>
                            <clipPath
                                id="bgblur_0_3070_812_clip_path"
                                transform="translate(4 4)">
                                <rect width="45" height="43" rx="10" />
                            </clipPath>
                        </defs>
                    </svg>)}
                </button>

                <div
                className={Style.theme}
                onClick={() => setSearchOpen(false)}  // close search when theme clicked
                >
                    <ThemeToggle />
                </div>
            </div>
            {menuOpen &&
                createPortal( // Render at document.body level so backdrop-filter blur applies correctly.
                    <div className={Style.mobileOverlayWrapper}>
                        <div className={Style.mobileOverlay}>
                            <ul className={Style.mobileMenu}>
                                <li>
                                    <NavLink
                                        to="/gallery"
                                        onClick={() => setMenuOpen(false)}>
                                        Gallery
                                    </NavLink>
                                        <span className={`${
                                        location.pathname.startsWith("/gallery")
                                            ? Style.hamburgerMobile
                                            : ""
                                    }`}></span>
                                    
                                </li>
                                <li>
                                    <NavLink
                                        to="/upload"
                                        onClick={() => setMenuOpen(false)}>
                                        Upload
                                    </NavLink>
                                        <span className={`${
                                        location.pathname.startsWith("/upload")
                                            ? Style.hamburgerMobile
                                            : ""
                                    }`}></span>
                                    
                                </li>
                                <li>
                                    <NavLink
                                        to="/profile"
                                        className={Style.mobileJoinButton}
                                        onClick={() => setMenuOpen(false)}>
                                        Join Here
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>,
                    document.body
                )}
        </div>

        {isMobile && isUploadPage && (
            <div className={Style.mobileNavbarSpacer}></div>
        )}
    </>
    );
});

export default NavBar;
