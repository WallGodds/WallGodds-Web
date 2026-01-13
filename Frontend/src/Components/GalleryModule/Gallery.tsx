import { useRef, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Styles from "./Gallery.module.css";
import NavBar from "../CommonModule/NavBarModule/NavBar";
import SideBar from "./SideBarModule/SideBar";
import GalleryGrid from "./GalleryGrid";

const Gallery = () => {
  const galleryContentRef = useRef<HTMLDivElement>(null);
  const [showBlend, setShowBlend] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (galleryContentRef.current) {
        const scrollTop = galleryContentRef.current.scrollTop;
        setShowBlend(scrollTop > 0);
      }
    };

    const galleryContent = galleryContentRef.current;
    if (galleryContent) {
      galleryContent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (galleryContent) {
        galleryContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className={Styles.container}>
      <NavBar />
      <div className={Styles.mainContent}>
        <SideBar />
        <div className={Styles.galleryContent} ref={galleryContentRef}>
          <div
            className={Styles.blendOverlay}
            style={{ opacity: showBlend ? 1 : 0 }}
          />
          <Routes>
            <Route path="mobile" element={<GalleryGrid category="mobile" />} />
            <Route path="tablet" element={<GalleryGrid category="tablet" />} />
            <Route path="desktop" element={<GalleryGrid category="desktop" />} />
            <Route path="" element={<Navigate to="mobile" replace />} />
          </Routes>
          <div
            className={Styles.blendOverlay2}
            style={{ opacity: showBlend ? 1 : 0 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
