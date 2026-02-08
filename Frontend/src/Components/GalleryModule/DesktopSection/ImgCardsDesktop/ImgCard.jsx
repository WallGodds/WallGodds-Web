import styles from "./ImgCard.module.css";

const ImgCard = ({ src }) => {
  return (
    <div className={styles.card}>
      <img src={src} alt="wallpaper" />
    </div>
  );
};

export default ImgCard;
