import { useRef, useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// LIGHT-ICONS
import MobileIcon_light from "./GallaryAssets/mobile-light.svg";
import TabletIcon_light from "./GallaryAssets/tablet-light.svg";
import LaptopIcon_light from "./GallaryAssets/laptop-light.svg";
// DARK-ICONS
import MobileIcon_dark from "./GallaryAssets/mobile-dark.svg";
import TabletIcon_dark from "./GallaryAssets/tablet-dark.svg";
import LaptopIcon_dark from "./GallaryAssets/laptop-dark.svg";


import Abstract from "./categorieItems/Abstract.svg";
import Nature from "./categorieItems/Nature.svg";
import Anime from "./categorieItems/Anime.svg";
import Art from "./categorieItems/Art.svg";
import Movies from "./categorieItems/Movies.svg";
import Vehicles from "./categorieItems/Vehicles.svg";
import Sports from "./categorieItems/Sports.svg";
import Games from "./categorieItems/Games.svg";
import Travel from "./categorieItems/Travel.svg";
import Spiritual from "./categorieItems/Spiritual.svg";
import Music from "./categorieItems/Music.svg";
import AIGen from "./categorieItems/AIGen.svg";

import Mobile from "./MobileSection/Mobile";
import Tablet from "./TabletSection/Tablet";
import Desktop from "./DesktopSection/Desktop";

import NavBar from "../CommonModule/NavBarModule/NavBar";
import Footer from "../CommonModule/FooterModule/Footer";

import Styles from "./Gallery.module.css";

// const devices = [
//   { id: "tablet", icon: TabletIcon, route: "/gallery/tablet" },
//   { id: "desktop", icon: LaptopIcon, route: "/gallery/desktop" },
//   { id: "mobile", icon: MobileIcon, route: "/gallery/mobile" },
// ];

const categories = [
  { title: "Abstract", image: Abstract },
  { title: "Nature", image: Nature },
  { title: "Anime", image: Anime },
  { title: "Art", image: Art },
  { title: "Movies", image: Movies },
  { title: "Vehicles", image: Vehicles },
  { title: "Sports", image: Sports },
  { title: "Gaming", image: Games },
  { title: "Travels", image: Travel },
  { title: "Spiritual", image: Spiritual },
  { title: "Music", image: Music },
  { title: "AI Gen", image: AIGen },
];

const Gallery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeDevice = location.pathname.split("/").pop();

  const [isDark, setIsDark] = useState(
    document.body.classList.contains("dark-theme")
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark-theme"));
    });
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const devices = [
    {
      id: "tablet",
      icon: isDark ? TabletIcon_dark : TabletIcon_light,
      route: "/gallery/tablet",
    },
    {
      id: "desktop",
      icon: isDark ? LaptopIcon_dark : LaptopIcon_light,
      route: "/gallery/desktop",
    },
    {
      id: "mobile",
      icon: isDark ? MobileIcon_dark : MobileIcon_light,
      route: "/gallery/mobile",
    },
  ];


  useEffect(() => {
    if (location.pathname === "/gallery" || location.pathname === "/gallery/") {
      navigate("/gallery/desktop", { replace: true });
    }
  }, [location.pathname, navigate]);

  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Navbar Scroll Logic
  // Navbar Scroll Logic
  const navbarRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const navbarScrollPos = useRef(0);

  // Sequential Scroll Logic (Non-passive listener to control event)
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const handleScroll = () => {
      const maxScroll = 250;
      const maxContentScroll = window.innerWidth <= 700 ? 55 : 120;

      let scrollTop = scrollArea.scrollTop;

      let navPos = Math.min(scrollTop, maxScroll);
      navbarScrollPos.current = navPos;

      const progress = (navPos / maxScroll) * 1.1;

      navbarRef.current.style.setProperty("--scroll-progress", progress);

      const contentTranslate = progress * -maxContentScroll;
      contentWrapperRef.current.style.setProperty(
        "--header-margin-top",
        `${contentTranslate}px`
      );
    };

    scrollArea.addEventListener("scroll", handleScroll);

    return () => scrollArea.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    sliderRef.current.classList.add(Styles.grabbing);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sliderRef.current) sliderRef.current.classList.remove(Styles.grabbing);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (sliderRef.current) sliderRef.current.classList.remove(Styles.grabbing);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <NavBar className={Styles.galleryNavbar} ref={navbarRef} />

      {/* Main Scroll Container */}
      <div className={Styles.container}>

        {/* Scrollable Content Wrapper */}
        <div className={Styles.contentWrapper} ref={contentWrapperRef}>
          {/* Device Selector */}
          <div className={Styles.deviceSelector}>
            {devices.map(({ id, icon: Icon, route }) => {
              const isActive = activeDevice === id;
              const isAnyActive = devices.some((d) => d.id === activeDevice);
              const shouldBlur = isAnyActive && !isActive;

              return (
                <button
                  key={id}
                  onClick={() => navigate(route)}
                  className={`${Styles.deviceBtn} ${isActive ? Styles.active : ""} ${shouldBlur ? Styles.blurred : ""}`}
                >
                  <img src={Icon} alt={id} width={34} height={34} />
                </button>
              );
            })}
          </div>

          <div className={Styles.temp}>
            {/* Categories */}
            <div
              ref={sliderRef}
              className={Styles.scrollItems}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className={Styles.categoryCard}
                  style={{ backgroundImage: `url(${cat.image})` }}
                >
                  <span className={Styles.categoryTitle}>{cat.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={Styles.galleryScrollArea} ref={scrollAreaRef}>
            {activeDevice === "mobile" && <Mobile />}

            <Routes>
              <Route path="desktop" element={<Desktop />} />
              <Route path="tablet" element={<Tablet />} />
            </Routes>

            <div className={Styles.footerWrapper}>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;