import { useState, useRef, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Styles from "./Upload.module.css";
import NavBar from "../CommonModule/NavBarModule/NavBar";
import Footer from "../CommonModule/FooterModule/Footer";

import LaptopIcon from "../GalleryModule/GallaryAssets/laptop-light.svg";
import TabletIcon from "../GalleryModule/GallaryAssets/tablet-light.svg";
import MobileIcon from "../GalleryModule/GallaryAssets/mobile-light.svg";
import UploadIconImg from "../GalleryModule/GallaryAssets/upload-icon.png";
import UploadIconImgDark from "../GalleryModule/GallaryAssets/upload-icon-dark.svg";
import UploadIcon from "../../../public/uploadicon.svg";
import UploadIconDark from "../../../public/upload_icon_dark.svg";

const Upload = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [wallpapers, setWallpapers] = useState([]);
  const [leftWallpapers, setLeftWallpapers] = useState([]);
  const [rightWallpapers, setRightWallpapers] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [count, setCount] = useState(5)
  const [previewFile, setPreviewFile] = useState(null)
  const fileInputRef = useRef(null);

  const [isDark, setIsDark] = useState(
    document.body.classList.contains("dark-theme")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark-theme"));
    });
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const categories = ["Abstract", "Nature", "Anime", "Art", "Movies", "Vehicles", "Sports", "Gaming", "Travels"
    , "Spiritual", "Music", "AI Gen"];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm();


  const onSubmit = () => {
    if (!previewFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const newWallpaper = {
          id: Date.now(),
          url: e.target.result,
          width: img.naturalWidth,
          height: img.naturalHeight,
        };

        const updated = [...wallpapers, newWallpaper];
        setWallpapers(updated);
        distributeWallpapers(updated);

        setPreviewFile(null);
        setCount((prev) => prev - 1);
        if (count == 0)
          setPreviewUrl(null)
        reset()
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(previewFile);
  };

  const getDeviceType = (width, height) => {
    const longer = Math.max(width, height);
    const shorter = Math.min(width, height);
    const ratio = Number((longer / shorter).toFixed(2));
    const isPortrait = height > width;

    if (ratio >= 2.0) return "mobile";

    if (ratio >= 1.7 && ratio < 2.0) {
      return isPortrait ? "mobile" : "laptop";
    }
    if (ratio < 1.7) return "tablet";

  };


  // Distribute wallpapers between columns based on height
  const distributeWallpapers = useCallback((allWallpapers) => {
    if (allWallpapers.length === 0) {
      setLeftWallpapers([]);
      setRightWallpapers([]);
      return;
    }

    const left = [];
    const right = [];
    let leftHeight = 0;
    let rightHeight = 0;

    allWallpapers.forEach((wallpaper, index) => {
      // Calculate proportional height based on aspect ratio
      const proportionalHeight = wallpaper.height / wallpaper.width;

      // First two wallpapers: left, then right
      if (index === 0) {
        left.push(wallpaper);
        leftHeight += proportionalHeight;
      } else if (index === 1) {
        right.push(wallpaper);
        rightHeight += proportionalHeight;
      } else {
        // After that, add to the column with smaller height
        if (leftHeight <= rightHeight) {
          left.push(wallpaper);
          leftHeight += proportionalHeight;
        } else {
          right.push(wallpaper);
          rightHeight += proportionalHeight;
        }
      }
    });

    setLeftWallpapers(left);
    setRightWallpapers(right);
  }, []);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setPreviewFile(file)

    const img = new Image()
    img.onload = () => {
      const deviceType = getDeviceType(img.width, img.height)
      setValue("device", deviceType)
    };
    img.src = url
  }

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
            <div className={Styles.previewFormContainer}>
              <div className={Styles.previewWrapper}>
                <img
                  src={previewUrl}
                  alt="Selected wallpaper preview"
                  className={Styles.previewImage}
                />
                <div className={Styles.uploadoption}>
                  {count > 0 && <label className={Styles.uploadcontainer}>
                    <div className={Styles.uploadicon}>
                      <img src={isDark ? UploadIconDark : UploadIcon} alt="upload" />
                    </div>
                    <p className={Styles.uploadtext}> Add upto {count} more images </p>
                    <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files[0])} hidden />
                  </label>}
                </div>
              </div>
              <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={Styles.row}>
                  <div className={Styles.field}>
                    {/* Wallpaper Name */}
                    <div className={Styles.field}>
                      {errors.wallpaperName && (
                        <div className={Styles.error}>
                          {errors.wallpaperName.message}
                        </div>
                      )}
                      <input
                        type="text"
                        placeholder="Wallpaper Name"
                        className={`${Styles.input} ${errors.wallpaperName ? Styles.errorInput : ""}`}
                        {...register("wallpaperName", {
                          required: "Wallpaper name is required",
                        })}
                      />
                    </div>
                  </div>


                  <div className={Styles.field}>
                    {errors.device && (
                      <div className={Styles.error}>
                        {errors.device.message}
                      </div>
                    )}
                    <select
                      defaultValue=""
                      className={`${Styles.input} ${errors.device ? Styles.errorInput : ""} ${!watch("device") ? Styles.placeholder : ""
                        }`}
                      {...register("device", {
                        required: "Please select a device",
                      })}
                    >
                      <option value="" disabled>
                        Choose Device
                      </option>
                      <option value="tablet">Tablet</option>
                      <option value="mobile">Mobile</option>
                      <option value="laptop">Laptop</option>
                    </select>

                  </div>

                  <div className={Styles.field}>
                    {errors.category && (
                      <div className={Styles.error}>
                        {errors.category.message}
                      </div>
                    )}
                    <select
                      defaultValue=""
                      className={`${Styles.input} ${errors.category ? Styles.errorInput : ""} ${!watch("category") ? Styles.placeholder : ""
                        }`}
                      {...register("category", {
                        required: "Please select a category",
                      })}
                    >
                      <option value="" disabled>
                        Choose Category
                      </option>

                      {categories.map((cat) => (
                        <option key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </option>
                      ))}

                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className={Styles.fieldwallpaper}>
                  <textarea
                    placeholder="Wallpaper Description (optional)"
                    {...register("description")}
                    className={`${Styles.input} ${Styles.description}`}
                  />
                </div>

                <div className={Styles.submitRow} >
                  <div className={Styles.field}>
                    {errors.accepted && (
                      <div className={Styles.error}>
                        {errors.accepted.message}
                      </div>
                    )}
                    <label className={Styles.line}>
                      <input
                        type="checkbox"
                        className={errors.accepted ? Styles.checkboxError : ""}
                        {...register("accepted", {
                          required: "You must accept the guidelines",
                        })}
                      />
                      I Understand and Accept the Guidelines
                    </label>
                  </div>

                  <button type="submit" className={Styles.uploadBtn} >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className={Styles.uploadContent}>
                <div className={Styles.uploadIconWrapper}>
                  <img
                    src={isDark ? UploadIconImgDark : UploadIconImg}
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
          {wallpapers.length === 0 ? (
            <div className={Styles.yourWallsPlaceholder}>
              <p className={Styles.placeholderTitle}>
                This space is waiting to be personalized
              </p>
              <p className={Styles.placeholderSubtitle}>
                Upload your favorite wallpapers and bring it to life
              </p>
            </div>
          ) : (
            <div className={Styles.masonryGrid}>
              <div className={Styles.column}>
                {leftWallpapers.map((wallpaper) => (
                  <div key={wallpaper.id} className={Styles.wallpaperCard}>
                    <img
                      src={wallpaper.url}
                      alt="Wallpaper"
                      className={Styles.wallpaperImage}
                    />
                  </div>
                ))}
              </div>

              <div className={Styles.column}>
                {rightWallpapers.map((wallpaper) => (
                  <div key={wallpaper.id} className={Styles.wallpaperCard}>
                    <img
                      src={wallpaper.url}
                      alt="Wallpaper"
                      className={Styles.wallpaperImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={Styles.footerWrapper}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Upload;