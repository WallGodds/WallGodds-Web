import Styles from "./Footer.module.css";
import { MdMailOutline } from "react-icons/md";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className={Styles.footer}>
            {/* Left */}
            <div className={Styles.left}>
                <div className={Styles.logoBox}>
                    <img src="/WallGodds_Favicon_Dark.png" alt="WallGodds Favicon" className={Styles.logoIcon} />
                </div>
                <span className={Styles.footerText}>A Community Initiative</span>
            </div>

            {/* Right */}
            <div className={Styles.socials}>
                <a href="#" title="WallGodds's Email" target="_blank" aria-label="Email" className={Styles.iconBtn}>
                    <MdMailOutline />
                </a>
                <a href="#" title="WallGodds's GitHub" target="_blank" aria-label="GitHub" className={Styles.iconBtn}>
                    <FaGithub />
                </a>
                <a href="#" title="WallGodds's LinkedIn" target="_blank" aria-label="LinkedIn" className={Styles.iconBtn}>
                    <FaLinkedin />
                </a>
                <a href="#" title="WallGodds's Discord" target="_blank" aria-label="Discord" className={Styles.iconBtn}>
                    <FaDiscord />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
