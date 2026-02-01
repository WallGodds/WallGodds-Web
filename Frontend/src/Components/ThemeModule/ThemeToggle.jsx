import { useState, useEffect } from "react";
import styles from "./ThemeToggle.module.css";
import DarkIcon from "/Dark_mode_new.svg";
import LightIcon from "/Light_mode_new.svg";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });
    const [isAnimating, setIsAnimating] = useState(false);

    const updateImages = (isDarkMode) => {
        document.querySelectorAll("img[data-logo]").forEach((logo) => {
            logo.style.opacity = "0";
            setTimeout(() => {
                logo.src = isDarkMode
                    ? "/WallGodds_logo_for_dark_mode.svg"
                    : "/WallGodds_Logo_for_light_mode.svg";
                logo.style.opacity = "1";
            }, 150);
        });

        document.querySelectorAll("img[data-github-arrow]").forEach((arrow) => {
            arrow.style.opacity = "0";
            setTimeout(() => {
                arrow.src = isDarkMode
                    ? "/Github_redirect_arrow_up_lite.svg"
                    : "/Github_redirect_arrow_up_dark.svg";
                arrow.style.opacity = "1";
            }, 150);
        });

        document.querySelectorAll("img[data-search]").forEach((search) => {
            search.style.opacity = "0";
            setTimeout(() => {
                search.src = isDarkMode
                    ? "/Search_new_light.svg"
                    : "/Search_new_dark.svg";
                search.style.opacity = "1";
            }, 150);
        });
    };

    const applyTheme = (isDarkMode) => {
        document.body.style.backgroundImage = isDarkMode
            ? "url('/Dark_mode_bg.webp')"
            : "url('/Light_mode_bg.webp')";
        document.body.classList.toggle("dark-theme", isDarkMode);
        document.body.style.color = isDarkMode ? "white" : "black";
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") === "dark";
        applyTheme(savedTheme);
    }, []);

    const toggleTheme = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        const newTheme = !isDark;
        setIsDark(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
        applyTheme(newTheme);
        updateImages(newTheme);

        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <img
                src={isDark ? LightIcon : DarkIcon}
                alt={isDark ? "Light Mode" : "Dark Mode"}
                className={styles.toggleIcon}
                style={{
                    transform: isAnimating
                        ? "rotate(180deg) scale(0.9)"
                        : "rotate(0deg) scale(1)",
                }}
            />
        </button>
    );
};

export default ThemeToggle;
