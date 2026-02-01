// This code is here for reference

import ImgCard from "./ImgCardsTablet/ImgCard";
import img1 from "./TabletAssets/tablet_wallpaper1.png";
import img2 from "./TabletAssets/tablet_wallpaper2.png";
import img3 from "./TabletAssets/tablet_wallpaper3.png";
import img4 from "./TabletAssets/tablet_wallpaper4.png";
import img5 from "./TabletAssets/tablet_wallpaper5.png";
import img6 from "./TabletAssets/tablet_wallpaper6.png";
import Styles from "./Tablet.module.css";

const Tablet = () => {
    return (
        <div className={Styles.gallery}>
            <div className={Styles.imgCards}>
                <ImgCard imageSrc={img3} />
                <ImgCard imageSrc={img1} />
                <ImgCard imageSrc={img2} />
            </div>
            <div className={Styles.imgCards}>
                <ImgCard imageSrc={img4} />
                <ImgCard imageSrc={img5} />
                <ImgCard imageSrc={img6} />
            </div>
            <div className={Styles.imgCards}>
                <ImgCard imageSrc={img1} />
                <ImgCard imageSrc={img2} />
                <ImgCard imageSrc={img3} />
            </div>
            <div className={Styles.imgCards}>
                <ImgCard imageSrc={img4} />
                <ImgCard imageSrc={img5} />
                <ImgCard imageSrc={img6} />
            </div>
        </div>
    );
};
export default Tablet;
