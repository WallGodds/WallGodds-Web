import Styles from "./Gallery.module.css";
import NavBar from "../CommonModule/NavBarModule/NavBar";
import Footer from "../CommonModule/FooterModule/Footer";

const Gallery = () => {
    return (
        <>
            <div className={Styles.navbarWrapper}>
                <NavBar />
            </div>
            <div className={Styles.container}>
                <div className={Styles.temp}>
                    <p className={Styles.first}>
                        <span className={Styles.desktopText}>
                            This section is being designed and will be available
                            for contributors soon
                        </span>
                        <span className={Styles.mobileText}>
                            This site is currently not responsive on mobile
                            devices
                        </span>
                    </p>
                    <p className={Styles.second}>
                        <span className={Styles.desktopText}>
                            Keep an eye on{" "}
                            <a
                                href="https://github.com/WallGodds/WallGodds-Web/issues"
                                target="_blank"
                                rel="noopener noreferrer">
                                Github
                            </a>{" "}
                            and{" "}
                            <a
                                href="https://discord.gg/kTQ5KWANp8"
                                target="_blank"
                                rel="noopener noreferrer">
                                Discord
                            </a>{" "}
                            for updates and announcements
                        </span>
                        <span className={Styles.mobileText}>
                            Contributors can expect mobile responsiveness issues
                            to be available by the second week of February
                        </span>
                    </p>
                </div>
                <div className={Styles.footerWrapper}>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Gallery;

// reference of old code:
{
    /* <Routes>
    <Route path="mobile" element={<Mobile />} />
    <Route path="tablet" element={<Tablet />} />
    <Route path="desktop" element={<Desktop />} />
    </Routes>; */
}
