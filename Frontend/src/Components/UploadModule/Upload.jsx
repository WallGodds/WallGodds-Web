import React, { useRef, useState } from "react";
import styles from "./Upload.module.css";
import NavBar from "../CommonModule/NavBarModule/NavBar";

const Upload = () => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <div className={styles.pageWrapper}>
      <NavBar />

      <main className={styles.mainContainer}>
        <section
          className={`${styles.uploadZone} ${dragOver ? styles.dragOver : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files[0]);
          }}
          onClick={() => fileInputRef.current.click()}
        >
          <div className={styles.uploadUI}>
            <div className={styles.mainIcon}>
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
                <rect x="20" y="10" width="35" height="25" rx="5" stroke="#9AA9FF" strokeWidth="2" />
                <rect x="30" y="18" width="35" height="25" rx="5" stroke="#9AA9FF" strokeWidth="2" fill="white" />
                <circle cx="58" cy="18" r="9" fill="#5B6CFF" />
                <path d="M58 14V22M54 18H62" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <h2 className={styles.uploadTitle}>
              Drag and Drop <span>a photo</span>
            </h2>
            <span className={styles.orText}>or</span>
            <button className={styles.browseBtn}>Browse</button>
            <p className={styles.fileLimit}>Maximum file size 6 MB</p>

            <div className={styles.ratioGroup}>
              <div className={styles.ratio}><div className={styles.r1610}></div> 16:10</div>
              <div className={styles.ratio}><div className={styles.r169}></div> 16:9</div>
              <div className={styles.ratio}><div className={styles.r209}></div> 20:9</div>
            </div>

            <div className={styles.guidelinesGrid}>
              <div className={styles.guideItem}>🔹 Upload original images without watermarks</div>
              <div className={styles.guideItem}>🔸 Spam or promotional content is not allowed</div>
              <div className={styles.guideItem}>🔹 Avoid explicit content, heavy edits</div>
              <div className={styles.guideItem}>🔸 Don’t use AI generated images</div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </section>

        <section className={styles.wallsSection}>
          <h3 className={styles.sectionHeading}>Your Walls</h3>
          <div className={styles.emptyStateText}>
            <h4>This space is waiting to be personalized</h4>
            <p>Upload your favorite wallpapers and bring it to life</p>
          </div>
          <div className={styles.wireframePlaceholder}></div>
        </section>
      </main>
    </div>
  );
};

export default Upload;
