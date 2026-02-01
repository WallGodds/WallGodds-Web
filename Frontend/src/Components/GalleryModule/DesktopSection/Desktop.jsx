// This code is here for reference

import ImgCard from "./ImgCardsDesktop/ImgCard";
import img1 from "./DesktopAssets/img_1.png";
import img2 from "./DesktopAssets/img_2.png";
import img3 from "./DesktopAssets/img_3.png";
import img4 from "./DesktopAssets/img_4.png";
import styles from "./Desktop.module.css";

const Desktop = () => {
    return (
        <div className={styles.desktopGrid}>
            <div className={styles.imgCards}>
                <ImgCard imageSrc={img1} />
                <ImgCard imageSrc={img2} />
            </div>
            <div className={styles.imgCards}>
                <ImgCard imageSrc={img3} />
                <ImgCard imageSrc={img4} />
            </div>
            <div className={styles.imgCards}>
                <ImgCard imageSrc={img1} />
                <ImgCard imageSrc={img2} />
            </div>
            <div className={styles.imgCards}>
                <ImgCard imageSrc={img3} />
                <ImgCard imageSrc={img4} />
            </div>
            <div className={styles.imgCards}>
                <ImgCard imageSrc={img1} />
                <ImgCard imageSrc={img2} />
            </div>
            <div className={styles.imgCards}>
                <ImgCard imageSrc={img3} />
                <ImgCard imageSrc={img4} />
            </div>
        </div>
    );
};

export default Desktop;
