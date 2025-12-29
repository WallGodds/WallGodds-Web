import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>WallGodds</h2>
          <p>Elevating your screens with high-quality wallpapers curated by the community.</p>
        </div>
        <div className={styles.links}>
          <h3>Explore</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/upload">Upload</Link></li>
          </ul>
        </div>
        <div className={styles.social}>
          <h3>Connect</h3>
          <div className={styles.icons}>
            <a href="https://discord.gg/kTQ5KWANp8" target="_blank" rel="noopener noreferrer">Discord</a>
            <a href="https://github.com/Parnab03/WallGodds" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/company/wallgodds/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} WallGodds Community. All rights reserved.</p>
      </div>
    </footer>
  );
};
