import styles from "./Desktop.module.css";
import ImgCard from "./ImgCardsDesktop/ImgCard";

import img1 from "./DesktopAssets/img_1.png";
import img2 from "./DesktopAssets/img_2.png";
import img3 from "./DesktopAssets/img_3.png";
import img4 from "./DesktopAssets/img_4.png";
import img5 from "./DesktopAssets/img_5.png";
import img6 from "./DesktopAssets/img_6.png";
import img7 from "./DesktopAssets/img_7.png";
import img8 from "./DesktopAssets/img_8.png";
import img9 from "./DesktopAssets/img_9.png";
import img10 from "./DesktopAssets/img_10.png";
import img11 from "./DesktopAssets/img_11.png";
import img12 from "./DesktopAssets/img_12.png";

const Desktop = () => {
  const images = [
    img1,img2,img3,img4,img5,img6,
    img7,img8,img9,img10,img11,img12
  ];

  return (
    <div className={styles.grid}>
      {images.map((src, i) => (
        <ImgCard key={i} src={src} />
      ))}
    </div>
  );
};

export default Desktop;