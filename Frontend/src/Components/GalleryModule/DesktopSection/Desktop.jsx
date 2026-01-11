import ImageCard from "../../CommonModule/ImageCardModule/ImageCard";
import img1 from "./DesktopAssets/img_1.png";
import img2 from "./DesktopAssets/img_2.png";
import img3 from "./DesktopAssets/img_3.png";
import img4 from "./DesktopAssets/img_4.png";
import styles from "./Desktop.module.css";

const Desktop = () => {
    return (
        <div className={styles.desktopGrid}>
            <div className={styles.imgCards}>
                <ImageCard imageSrc={img1} />
                <ImageCard imageSrc={img2} />
            </div>
            <div className={styles.imgCards}>
                <ImageCard imageSrc={img3} />
                <ImageCard imageSrc={img4} />
            </div>
            <div className={styles.imgCards}>
                <ImageCard imageSrc={img1} />
                <ImageCard imageSrc={img2} />
            </div>
            <div className={styles.imgCards}>
                <ImageCard imageSrc={img3} />
                <ImageCard imageSrc={img4} />
            </div>
            <div className={styles.imgCards}>
                <ImageCard imageSrc={img1} />
                <ImageCard imageSrc={img2} />
            </div>
            <div className={styles.imgCards}>
                <ImageCard imageSrc={img3} />
                <ImageCard imageSrc={img4} />
            </div>
        </div>
    )
}

export default Desktop

