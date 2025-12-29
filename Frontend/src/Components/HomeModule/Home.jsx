import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../CommonModule/NavBarModule/NavBar";
import styles from "./Home.module.css";
import character from "/Character.svg";

const Home = () => {
  const navigate = useNavigate();

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
                <button className={styles.btn} onClick={() => navigate("/signup")}>
                  BECOME A <span className={styles.god}>GOD</span>
                </button>
                <button className={styles.btn} onClick={() => navigate("/gallery")}>
                  EXPLORE <span className={styles.heaven}>HEAVEN</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
