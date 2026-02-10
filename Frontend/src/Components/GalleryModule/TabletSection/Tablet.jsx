import ImgCard from "./ImgCardsTablet/ImgCard";
import Styles from "./Tablet.module.css";

import img1 from "./TabletAssets/tablet_wallpaper1.png";
import img2 from "./TabletAssets/tablet_wallpaper2.png";
import img3 from "./TabletAssets/tablet_wallpaper3.png";
import img4 from "./TabletAssets/tablet_wallpaper4.png";
import img5 from "./TabletAssets/tablet_wallpaper5.png";
import img6 from "./TabletAssets/tablet_wallpaper6.png";

const images = [img1, img2, img4, img5, img6, img3];

const Tablet = () => {
    return (
        <div className={Styles.gallery}>
            {images.map((img, index) => (
                <ImgCard key={index} imageSrc={img} />
            ))}
        </div>
    );
};

export default Tablet;
