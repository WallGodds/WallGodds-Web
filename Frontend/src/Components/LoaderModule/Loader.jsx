import { useState, useEffect } from "react";
import Styles from "./Loader.module.css";

const Loader = ({ onLoadingComplete }) => {
    const [phase, setPhase] = useState("show");
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const darkMode = savedTheme === "dark";
        setIsDark(darkMode);
        const preloadImages = () => {
            return new Promise((resolve) => {
                const images = ["/Light_mode_bg.webp", "/Dark_mode_bg.webp"];
                let loaded = 0;
                images.forEach((src) => {
                    const img = new Image();
                    img.onload = img.onerror = () => {
                        loaded++;
                        if (loaded === images.length) {
                            resolve();
                        }
                    };
                    img.src = src;
                });
                setTimeout(resolve, 1500);
            });
        };

        const preloadPromise = preloadImages();
        const timeline = async () => {
            await new Promise((r) => setTimeout(r, 800));
            await preloadPromise;
            setPhase("fade");
            await new Promise((r) => setTimeout(r, 400));
            setPhase("done");
            if (onLoadingComplete) {
                onLoadingComplete();
            }
        };

        timeline();
    }, [onLoadingComplete]);

    if (phase === "done") return null;

    const logoSrc = isDark
        ? "/WallGodds_logo_for_dark_mode.svg"
        : "/WallGodds_Logo_for_light_mode.svg";

    return (
        <div
            className={`${Styles.loaderContainer} ${isDark ? Styles.dark : ""} ${phase === "fade" ? Styles.fadeOut : ""}`}
            role="status"
            aria-label="Loading WallGodds">
            <img
                src={logoSrc}
                alt="WallGodds"
                className={`${Styles.logo} ${phase === "fade" ? Styles.logoFade : ""}`}
            />
        </div>
    );
};

export default Loader;
