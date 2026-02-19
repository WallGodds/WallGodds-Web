import { useState, useRef, useCallback } from "react";
import Styles from "./Upload.module.css";
import NavBar from "../CommonModule/NavBarModule/NavBar";
import Footer from "../CommonModule/FooterModule/Footer";

import LaptopIcon from "../GalleryModule/GallaryAssets/laptop-light.svg";
import TabletIcon from "../GalleryModule/GallaryAssets/tablet-light.svg";
import MobileIcon from "../GalleryModule/GallaryAssets/mobile-light.svg";
import UploadIconImg from "../GalleryModule/GallaryAssets/upload-icon.png";

const Upload = () => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = useCallback((file) => {
        if (!file || !file.type.startsWith("image/")) return;
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        handleFile(e.dataTransfer.files?.[0]);
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e) => {
        handleFile(e.target.files?.[0]);
        e.target.value = "";
    };

    return (
        <>
            <div className={Styles.navbarWrapper}>
                <NavBar />
            </div>

            <div className={Styles.container}>
                <div
                    className={`${Styles.uploadBox} ${isDraggingOver ? Styles.dragging : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {previewUrl ? (
                        <div className={Styles.previewWrapper}>
                            <img
                                src={previewUrl}
                                alt="Selected wallpaper preview"
                                className={Styles.previewImage}
                            />
                        </div>
                    ) : (
                        <>
                            <div className={Styles.uploadContent}>
                                <div className={Styles.uploadIconWrapper}>
                                    <img
                                        src={UploadIconImg}
                                        alt="Upload icon"
                                        className={Styles.uploadIcon}
                                    />
                                </div>

                                <p className={Styles.dragText}>
                                    <span className={Styles.drag}>Drag </span>
                                    <span className={Styles.and}>and </span>
                                    <span className={Styles.drop}>Drop</span>
                                    <span className={Styles.photoText}> a photo</span>
                                </p>

                                <p className={Styles.orText}>or</p>

                                <button
                                    type="button"
                                    className={Styles.browseBtn}
                                    onClick={handleBrowseClick}
                                >
                                    Browse
                                </button>

                                <p className={Styles.fileSizeText}>Maximum file size 6 MB</p>

                                <div className={Styles.aspectRatios}>
                                    <div className={Styles.aspectItem}>
                                        <img
                                            src={TabletIcon}
                                            alt="Tablet 16:10"
                                            className={Styles.aspectIcon}
                                        />
                                        <span>16:10</span>
                                    </div>
                                    <div className={Styles.aspectItem}>
                                        <img
                                            src={LaptopIcon}
                                            alt="Laptop 16:9"
                                            className={Styles.aspectIcon}
                                        />
                                        <span>16:9</span>
                                    </div>
                                    <div className={Styles.aspectItem}>
                                        <img
                                            src={MobileIcon}
                                            alt="Mobile 20:9"
                                            className={Styles.aspectIcon}
                                        />
                                        <span>20:9</span>
                                    </div>
                                </div>
                            </div>

                            <div className={Styles.guidelines}>
                                <div className={Styles.guidelineCol}>
                                    <div className={Styles.guidelineItem}>
                                        <svg className={Styles.guidelineIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.17539 1.22461C4.04055 1.22461 2.47313 1.22461 1.49926 2.19848C0.525391 3.17235 0.525391 4.73977 0.525391 7.87461C0.525391 11.0094 0.525391 12.5769 1.49926 13.5507C2.47313 14.5246 4.04055 14.5246 7.17539 14.5246C10.3102 14.5246 11.8777 14.5246 12.8515 13.5507C13.8254 12.5769 13.8254 11.0094 13.8254 7.87461V5.42461" stroke="#ABB3FE" strokeWidth="1.05" strokeLinecap="round" />
                                            <path d="M0.525391 9.02059C0.958703 8.95765 1.39678 8.92656 1.83559 8.92765C3.69195 8.88842 5.50284 9.46685 6.94514 10.5597C8.28279 11.5733 9.2227 12.9682 9.62539 14.5258" stroke="#ABB3FE" strokeWidth="1.05" strokeLinejoin="round" />
                                            <path d="M13.8254 10.9535C13.0026 10.5368 12.1515 10.3253 11.2957 10.3262C9.99954 10.3211 8.71645 10.7975 7.52539 11.7262" stroke="#ABB3FE" strokeWidth="1.05" strokeLinejoin="round" />
                                            <path d="M8.92578 3.32539C8.92578 3.32539 9.62578 3.32539 10.3258 4.72539C10.3258 4.72539 12.5493 1.22539 14.5258 0.525391" stroke="#ABB3FE" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>Upload original images without watermarks</span>
                                    </div>
                                    <div className={Styles.guidelineItem}>
                                        <svg className={Styles.guidelineIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.17539 1.22461C4.04055 1.22461 2.47313 1.22461 1.49926 2.19848C0.525391 3.17235 0.525391 4.73977 0.525391 7.87461C0.525391 11.0094 0.525391 12.5769 1.49926 13.5507C2.47313 14.5246 4.04055 14.5246 7.17539 14.5246C10.3102 14.5246 11.8777 14.5246 12.8515 13.5507C13.8254 12.5769 13.8254 11.0094 13.8254 7.87461V5.42461" stroke="#ABB3FE" strokeWidth="1.05" strokeLinecap="round" />
                                            <path d="M0.525391 9.02059C0.958703 8.95765 1.39678 8.92656 1.83559 8.92765C3.69195 8.88842 5.50284 9.46685 6.94514 10.5597C8.28279 11.5733 9.2227 12.9682 9.62539 14.5258" stroke="#ABB3FE" strokeWidth="1.05" strokeLinejoin="round" />
                                            <path d="M13.8254 10.9535C13.0026 10.5368 12.1515 10.3253 11.2957 10.3262C9.99954 10.3211 8.71645 10.7975 7.52539 11.7262" stroke="#ABB3FE" strokeWidth="1.05" strokeLinejoin="round" />
                                            <path d="M8.92578 3.32539C8.92578 3.32539 9.62578 3.32539 10.3258 4.72539C10.3258 4.72539 12.5493 1.22539 14.5258 0.525391" stroke="#ABB3FE" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>Avoid explicit content, heavy edits</span>
                                    </div>
                                </div>

                                <div className={Styles.guidelineCol}>
                                    <div className={Styles.guidelineItem}>
                                        <svg className={Styles.guidelineIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.8254 7.87461C13.8254 11.0094 13.8254 12.5769 12.8515 13.5507C11.8777 14.5246 10.3102 14.5246 7.17539 14.5246C4.04055 14.5246 2.47313 14.5246 1.49926 13.5507C0.525391 12.5769 0.525391 11.0094 0.525391 7.87461C0.525391 4.73977 0.525391 3.17235 1.49926 2.19848C2.47313 1.22461 4.04055 1.22461 7.17539 1.22461" stroke="#F2AB93" strokeWidth="1.05" strokeLinecap="round" />
                                            <path d="M0.525391 9.02059C0.958703 8.95765 1.39678 8.92656 1.83559 8.92765C3.69195 8.88842 5.50284 9.46685 6.94514 10.5597C8.28279 11.5733 9.2227 12.9682 9.62539 14.5258" stroke="#F2AB93" strokeWidth="1.05" strokeLinejoin="round" />
                                            <path d="M13.8254 10.9535C13.0026 10.5368 12.1515 10.3253 11.2957 10.3262C9.99954 10.3211 8.71645 10.7975 7.52539 11.7262" stroke="#F2AB93" strokeWidth="1.05" strokeLinejoin="round" />
                                            <path d="M14.525 5.42539L12.075 2.97539M12.075 2.97539L9.625 0.525391M12.075 2.97539L14.525 0.525391M12.075 2.97539L9.625 5.42539" stroke="#F2AB93" strokeWidth="1.05" strokeLinecap="round" />
                                        </svg>
                                        <span>Spam or promotional content is not allowed</span>
                                    </div>
                                    <div className={Styles.guidelineItem}>
                                        <svg className={Styles.guidelineIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.8254 7.87461C13.8254 11.0094 13.8254 12.5769 12.8515 13.5507C11.8777 14.5246 10.3102 14.5246 7.17539 14.5246C4.04055 14.5246 2.47313 14.5246 1.49926 13.5507C0.525391 12.5769 0.525391 11.0094 0.525391 7.87461C0.525391 4.73977 0.525391 3.17235 1.49926 2.19848C2.47313 1.22461 4.04055 1.22461 7.17539 1.22461" stroke="#F2AB93" strokeWidth="1.05" strokeLinecap="round" />
                                            <path d="M0.525391 9.02059C0.958703 8.95765 1.39678 8.92656 1.83559 8.92765C3.69195 8.88842 5.50284 9.46685 6.94514 10.5597C8.28279 11.5733 9.2227 12.9682 9.62539 14.5258" stroke="#F2AB93" strokeWidth="1.05" strokeLinejoin="round" />
                                            <path d="M13.8254 10.9535C13.0026 10.5368 12.1515 10.3253 11.2957 10.3262C9.99954 10.3211 8.71645 10.7975 7.52539 11.7262" stroke="#F2AB93" strokeWidth="1.05" strokeLinejoin="round" />
                                            <path d="M14.525 5.42539L12.075 2.97539M12.075 2.97539L9.625 0.525391M12.075 2.97539L14.525 0.525391M12.075 2.97539L9.625 5.42539" stroke="#F2AB93" strokeWidth="1.05" strokeLinecap="round" />
                                        </svg>
                                        <span>Don't use AI generated images</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className={Styles.hiddenInput}
                        onChange={handleFileInputChange}
                        tabIndex={-1}
                        aria-label="Upload image"
                    />
                </div>

                <div className={Styles.yourWalls}>
                    <h2 className={Styles.yourWallsTitle}>Your Walls</h2>
                    <div className={Styles.yourWallsPlaceholder}>
                        <p className={Styles.placeholderTitle}>
                            This space is waiting to be personalized
                        </p>
                        <p className={Styles.placeholderSubtitle}>
                            Upload your favorite wallpapers and bring it to life
                        </p>
                    </div>
                </div>

                <div className={Styles.footerWrapper}>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Upload;