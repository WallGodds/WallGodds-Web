import React from "react";
import NavBar from "../CommonModule/NavBarModule/NavBar";
import styles from "./Home.module.css";
import {Footer} from "../CommonModule/FooterModule/Footer";
import character from "/Character.svg";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className={styles.heroSection}>
        <div className={styles.mainContainer}>
          <div className={styles.characterElement}>
            <img
              src={character}
              alt="3D Illustration"
              className={styles.characterImage}
            />
          </div>
          <div className={styles.centerWrapper}>
            <div className={styles.centerContainer}>
              <div className={styles.textContainer}>
                <h1 className={styles.headLine}>
                  WE ARE THE <br /> <span className={styles.godText}>GOD</span>
                  <br />
                  OF
                  <br />
                  <span className={styles.wallpaperText}>WALLPAPERS</span>
                </h1>
              </div>
              <div className={styles.buttons}>
                <button className={styles.btn}>
                  BECOME A <span className={styles.god}>GOD</span>
                </button>
                <button className={styles.btn}>
                  EXPLORE <span className={styles.heaven}>HEAVEN</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
