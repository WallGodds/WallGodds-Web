// This code is here for reference

import ImgCard from "./ImgCardsMobile/ImgCard";
import Styles from "./Mobile.module.css";

import img1 from "./MobileAssets/mobile_wallpaper1.png";
import img2 from "./MobileAssets/mobile_wallpaper2.png";
import img3 from "./MobileAssets/mobile_wallpaper3.png";
import img4 from "./MobileAssets/mobile_wallpaper4.png";
import img5 from "./MobileAssets/mobile_wallpaper5.png";
import img6 from "./MobileAssets/mobile_wallpaper6.png";
import img7 from "./MobileAssets/mobile_wallpaper7.png";
import img8 from "./MobileAssets/mobile_wallpaper8.png";
import img9 from "./MobileAssets/mobile_wallpaper9.png";
import img10 from "./MobileAssets/mobile_wallpaper10.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const Mobile = () => {
    return (
        <div className={Styles.gallery}>
            <div className={Styles.imgGrid}>
                {images.map((img, index) => (
                    <ImgCard key={index} imageSrc={img} />
                ))}
            </div>
        </div>
    );
};

export default Mobile;
