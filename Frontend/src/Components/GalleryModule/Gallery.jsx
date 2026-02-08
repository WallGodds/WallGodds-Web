import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MobileIcon from "./GallaryAssets/mobile.svg";
import TabletIcon from "./GallaryAssets/tablet.svg";
import LaptopIcon from "./GallaryAssets/laptop.svg";

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
import Desktop from "./DesktopSection/Desktop";

import Styles from "./Gallery.module.css";
import NavBar from "../CommonModule/NavBarModule/NavBar";
import Footer from "../CommonModule/FooterModule/Footer";

const devices = [
  { id: "tablet", icon: TabletIcon, route: "/gallery/tablet" },
  { id: "desktop", icon: LaptopIcon, route: "/gallery/desktop" },
  { id: "mobile", icon: MobileIcon, route: "/gallery/mobile" },
];

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

  useEffect(() => {
    if (location.pathname === "/gallery" || location.pathname === "/gallery/") {
      navigate("/gallery/desktop", { replace: true });
    }
  }, [location.pathname, navigate]);

  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
      <div className={Styles.navbarWrapper}>
        <NavBar />
      </div>

      <div className={Styles.container}>
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

        {activeDevice === "desktop" && <Desktop />}

        <div className={Styles.footerWrapper}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Gallery;
