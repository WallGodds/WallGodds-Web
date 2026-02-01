// This code is here for reference

import React, { useState } from "react";
import Save from "/Save.svg";
import SaveFilled from "/Save-filled.svg";
import Heart from "/Heart.svg";
import HeartFilled from "/Heart-filled.svg";
import DownloadBtn from "/DownloadButton.svg";
import Style from "./ImgCard.module.css";
import Popup from "../../../CommonModule/PopupModule/Popup.jsx";
import Toast from "../../../CommonModule/ToastModule/Toast.jsx";

const ImgCard = ({ imageSrc }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const handleDownloadClick = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        setToast({
            show: true,
            message: !isLiked
                ? "Wallpaper added to favorites!"
                : "Wallpaper removed from favorites!",
            type: "success",
        });
    };

    const handleSaveClick = () => {
        setIsSaved(!isSaved);
        setToast({
            show: true,
            message: !isSaved
                ? "Wallpaper saved to collection!"
                : "Wallpaper removed from collection!",
            type: "success",
        });
    };

    const closeToast = () => {
        setToast({ ...toast, show: false });
    };

    return (
        <div className={Style.imgCard}>
            <div className={Style.icons}>
                <img
                    src={isSaved ? SaveFilled : Save}
                    alt="Save"
                    className={`${Style.icon} ${isSaved ? Style.saved : ""}`}
                    onClick={handleSaveClick}
                />
                <img
                    src={isLiked ? HeartFilled : Heart}
                    alt="Heart"
                    className={`${Style.icon} ${isLiked ? Style.liked : ""}`}
                    onClick={handleLikeClick}
                />
            </div>
            <div className={Style.imageContainer}>
                <img src={imageSrc} alt="img" className={Style.image} />
            </div>
            <div className={Style.bottomBar}>
                <div className={Style.userInfo}>
                    <span className={Style.username}>@Img User1</span>
                    <img
                        src={DownloadBtn}
                        alt="DownloadBtn"
                        className={Style.downloadBtn}
                        onClick={handleDownloadClick}
                    />
                </div>
            </div>

            <Popup
                isOpen={isPopupOpen}
                onClose={closePopup}
                message="Download not available right now. Stay tuned! For backend updates, follow our Discord and check the GitHub repo."
                title="Download Status"
            />

            <Toast
                isVisible={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />
        </div>
    );
};

export default ImgCard;
