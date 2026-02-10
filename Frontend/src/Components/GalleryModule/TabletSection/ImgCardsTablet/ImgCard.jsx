import styles from './ImgCard.module.css';

const ImgCard = ({ imageSrc }) => {
    return (
        <div className={styles.cardContainer}>
            <img src={imageSrc} alt="Tablet Wallpaper" className={styles.image} />
        </div>
    );
};

export default ImgCard;
