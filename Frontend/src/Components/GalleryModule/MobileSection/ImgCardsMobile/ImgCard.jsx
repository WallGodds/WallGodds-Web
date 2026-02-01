// This code is here for reference

import React, { useState } from "react";
import Style from "./ImgCard.module.css";
import { LiaDownloadSolid } from "react-icons/lia";
import Save from "/Save.svg";
import SaveFilled from "/Save-filled.svg";
import Heart from "/Heart.svg";
import HeartFilled from "/Heart-filled.svg";
import Download from "/Vector.svg";
import Popup from "../../../CommonModule/PopupModule/Popup.jsx";
import Toast from "../../../CommonModule/ToastModule/Toast.jsx";

const ImgCard = ({ imageSrc, username = "@ImgUser1" }) => {
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
            {/* Image Container with Overlay Icons */}
            <div className={Style.imageContainer}>
                <img src={imageSrc} alt="Wallpaper" className={Style.image} />

                {/* Left (Bookmark) & Right (Heart) Overlay Icons */}
                <img
                    src={isSaved ? SaveFilled : Save}
                    alt="Save"
                    className={`${Style.icon} ${Style.bookmarkIcon} ${isSaved ? Style.saved : ""}`}
                    onClick={handleSaveClick}
                />
                <img
                    src={isLiked ? HeartFilled : Heart}
                    alt="Heart"
                    className={`${Style.icon} ${Style.heartIcon} ${isLiked ? Style.liked : ""}`}
                    onClick={handleLikeClick}
                />

                {/* Username (Always Visible on Large Screens) */}
                <span className={Style.username}>{username}</span>

                {/* Username + Download Button in Bottom Overlay (ONLY for Mobile) */}
                <div className={Style.bottomOverlay}>
                    <span>{username}</span>
                    <button
                        className={Style.downloadBtn}
                        onClick={handleDownloadClick}>
                        Download{" "}
                        <LiaDownloadSolid className={Style.downloadIcon} />
                    </button>
                </div>
            </div>

            {/* Download Button BELOW image (ONLY for Large Screens) */}
            <div className={Style.downloadBar}>
                <button
                    className={Style.downloadBtn}
                    onClick={handleDownloadClick}>
                    Download <LiaDownloadSolid className={Style.downloadIcon} />
                </button>
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
