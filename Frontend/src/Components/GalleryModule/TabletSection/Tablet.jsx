import ImageCard from "../../CommonModule/ImageCardModule/ImageCard";
import img1 from "./TabletAssets/tablet_wallpaper1.png"
import img2 from "./TabletAssets/tablet_wallpaper2.png"
import img3 from "./TabletAssets/tablet_wallpaper3.png"
import img4 from "./TabletAssets/tablet_wallpaper4.png"
import img5 from "./TabletAssets/tablet_wallpaper5.png"
import img6 from "./TabletAssets/tablet_wallpaper6.png"
import Styles from "./Tablet.module.css";

const Tablet = () => {
    return (
        <div className={Styles.gallery}>
            <div className={Styles.imgCards}>
                <ImageCard imageSrc={img3} />
                <ImageCard imageSrc={img1} />
                <ImageCard imageSrc={img2} />
            </div>
            <div className={Styles.imgCards}>
                <ImageCard imageSrc={img4} />
                <ImageCard imageSrc={img5} />
                <ImageCard imageSrc={img6} />
            </div>
            <div className={Styles.imgCards}>
                <ImageCard imageSrc={img1} />
                <ImageCard imageSrc={img2} />
                <ImageCard imageSrc={img3} />
            </div>
            <div className={Styles.imgCards}>
                <ImageCard imageSrc={img4} />
                <ImageCard imageSrc={img5} />
                <ImageCard imageSrc={img6} />
            </div>
        </div>
    );
};
export default Tablet;