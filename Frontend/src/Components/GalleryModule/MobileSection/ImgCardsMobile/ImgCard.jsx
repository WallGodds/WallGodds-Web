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
import Skeleton from "../../../CommonModule/SkeletonModule/Skeleton.jsx";

const ImgCard = ({ imageSrc, username = "@ImgUser1" }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const handleDownloadClick = async () => {
        try {
            const response = await fetch(imageSrc);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            
            // Extract filename from path or use a default
            const filename = imageSrc.split('/').pop() || 'wallpaper.png';
            link.setAttribute('download', filename);
            
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

            setToast({
                show: true,
                message: 'Download started successfully!',
                type: 'success'
            });
        } catch (error) {
            console.error("Download failed:", error);
            setToast({
                show: true,
                message: 'Failed to download image. Please try again.',
                type: 'error'
            });
        }
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        setToast({
            show: true,
            message: !isLiked ? 'Wallpaper added to favorites!' : 'Wallpaper removed from favorites!',
            type: 'success'
        });
    };

    const handleSaveClick = () => {
        setIsSaved(!isSaved);
        setToast({
            show: true,
            message: !isSaved ? 'Wallpaper saved to collection!' : 'Wallpaper removed from collection!',
            type: 'success'
        });
    };

    const closeToast = () => {
        setToast({ ...toast, show: false });
    };

    return (
        <div className={Style.imgCard}>
            {/* Image Container with Overlay Icons */}
            <div className={Style.imageContainer}>
                {imageLoading && (
                    <div className={Style.skeletonOverlay}>
                        <Skeleton width="100%" height="100%" borderRadius="12px" />
                    </div>
                )}
                <img 
                    src={imageSrc} 
                    alt="Wallpaper" 
                    className={`${Style.image} ${imageLoading ? Style.hidden : ''}`} 
                    onLoad={() => setImageLoading(false)}
                />

                {!imageLoading && (
                    <>
                        <img 
                            src={isSaved ? SaveFilled : Save} 
                            alt="Save" 
                            className={`${Style.icon} ${Style.bookmarkIcon} ${isSaved ? Style.saved : ''}`}
                            onClick={handleSaveClick}
                        />
                        <img 
                            src={isLiked ? HeartFilled : Heart} 
                            alt="Heart" 
                            className={`${Style.icon} ${Style.heartIcon} ${isLiked ? Style.liked : ''}`}
                            onClick={handleLikeClick}
                        />
                        <span className={Style.username}>{username}</span>
                        <div className={Style.bottomOverlay}>
                            <span>{username}</span>
                            <button className={Style.downloadBtn} onClick={handleDownloadClick}>
                                Download <LiaDownloadSolid className={Style.downloadIcon} />
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Download Button BELOW image (ONLY for Large Screens) */}
            <div className={Style.downloadBar}>
                <button className={Style.downloadBtn} onClick={handleDownloadClick}>
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