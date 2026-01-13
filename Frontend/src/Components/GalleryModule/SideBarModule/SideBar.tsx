import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideBar.module.css";

const SideBar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname.split("/").pop() || "desktop");

    // Sync activeItem with URL path
    useEffect(() => {
        const currentPath = location.pathname.split("/").pop() || "desktop";
        setActiveItem(currentPath);
    }, [location]);

    const handleItemClick = (item: string) => {
        setActiveItem(item); // Update active state
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.mainContainer}>
                <div className={styles.listContainer}>
                    <ul className={styles.verticalList}>
                        <li 
                            className={`${styles.listItem} ${activeItem === "mobile" ? styles.active : ""}`}
                            onClick={() => handleItemClick("mobile")}
                        >
                            <Link to="/gallery/mobile">Mobile</Link>
                        </li>
                        <li 
                            className={`${styles.listItem} ${activeItem === "tablet" ? styles.active : ""}`}
                            onClick={() => handleItemClick("tablet")}
                        >
                            <Link to="/gallery/tablet">Tablet</Link>
                        </li>
                        <li 
                            className={`${styles.listItem} ${activeItem === "desktop" ? styles.active : ""}`}
                            onClick={() => handleItemClick("desktop")}
                        >
                            <Link to="/gallery/desktop">Desktop</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.copyright}>
                    <p id="copyright">© WallGodds <span className={styles.year}>2025</span></p>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
