import { NavLink } from "react-router-dom";
import Style from "./NavBar.module.css";
import ThemeToggle from "../../ThemeModule/ThemeToggle";
import { useState, useRef, useEffect } from "react";

const NavBar = () => {
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

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    searchRef.current?.blur();
  },[isDark]);

  return (
    <div className={Style.navbar}>
      <div className={Style.logo}>
        <NavLink to="/">
          <img src={Logo} alt="WallGodds Logo" />
        </NavLink>
      </div>
      <nav className={Style.navigation}>
        <ul className={Style.menu}>
          <li><NavLink to="/gallery">Gallery</NavLink></li>
          <li><NavLink to="/upload">Upload</NavLink></li>
          <li>
            <a href="https://github.com/WallGodds" target="_blank" rel="noopener noreferrer" className={Style.github}>
              Github
            </a>
            <img className={Style.github_arrow} src={Github_arrow} alt="Arrow" />
          </li>
        </ul>
      </nav>

      <div className={Style.actions}>
        <div className={`${Style.search} ${searchOpen ? Style.open : ""}`}>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={Style.searchInput}
          />
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <img src={Search} alt="Search" />
          </button>
        </div>
        <button className={Style.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="45" height="43" viewBox="0 0 45 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <foreignObject x="-4" y="-4" width="53" height="51">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ backdropFilter: "blur(2px)", clipPath: "url(#bgblur_0_3070_812_clip_path)", height: "100%", width: "100%" }}></div>
            </foreignObject>
            <g data-figma-bg-blur-radius="4">
              <rect className={Style.hamburgerBg} width="45" height="43" rx="10" fill="white"/>
              <path className={Style.hamburgerLines} d="M14 14.5L30 14.5" stroke="#141B34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path className={Style.hamburgerLines} d="M14 21.5L30 21.5" stroke="#141B34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path className={Style.hamburgerLines} d="M14 28.5L30 28.5" stroke="#141B34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="bgblur_0_3070_812_clip_path" transform="translate(4 4)">
                <rect width="45" height="43" rx="10"/>
              </clipPath>
            </defs>
          </svg>
        </button>

        <div className={Style.theme}>
          <ThemeToggle />
        </div>
      </div>
      {menuOpen && (
        <div className={Style.mobileOverlay}>
          <ul className={Style.mobileMenu}>
            <li><NavLink to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</NavLink></li>
            <li><NavLink to="/upload" onClick={() => setMenuOpen(false)}>Upload</NavLink></li>
            <li><a href="https://github.com/WallGodds" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;